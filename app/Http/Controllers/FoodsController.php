<?php

namespace App\Http\Controllers;

use App\Models\Food;
use App\Models\User;
use App\Models\Location;
use Illuminate\Http\Request;

use Log;
class FoodsController extends Controller
{

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['foods', 'index']);

    }



    public function index(Request $request)
    {

        $id = $request->food_id;
        $food = Food::find($id);
        $userId = $food->user_id;

        $seller = User::where('id', $userId)->first();


        if (!$food) {
            return response()->json([
                'message' => 'food not found',
                'data' => null
            ]);
        }

        return response()->json([
            'message' => 'food retrieved successfully',
            'data' => $food,
            'seller' => $seller
        ]);
        // $user = Auth::user();
    }

    public function foods(Request $request)
    {
        $radius = $request->input('r');

        $user = auth()->user();

        $userLocation = $user->locations()->get();
        // if (!$user) {
        //     return redirect('/login');
        // }

        $is_all = $request->input('all');
        if ($is_all === 'true' || !$user || !$userLocation->count()) {

            $foods = Food::all();
            if ($foods->isEmpty()) {
                return response()->json([
                    'message' => 'foods not found',
                    'data' => null,

                ], 400);
            }
            return response()->json([
                'message' => 'foods retrieved successfully',
                'data' => [
                    'foods' => $foods,
                    'user' => $user,
                    'location' => $userLocation
                ],

            ], 200);
        } else {
            $is_delivery = $request->input('d');
            $is_delivery = $is_delivery === 'true';
            // Фильтруем еду по условию доставки
            $foods = Food::where('delivery', $is_delivery)->get();


            if ($foods->isEmpty()) {
                return response()->json([
                    'message' => 'foods not found',
                    'data' => null
                ], 400);
            }

            // Получаем все местоположения пользователя
            $locations = $user->locations()->get();

            if ($locations->isEmpty()) {
                return response()->json([
                    'message' => 'user location not found',
                    'data' => null
                ], 400);
            }

            $centerCoordinates = [$locations->first()->latitude, $locations->first()->longitude];

            $allLocations = Location::all();
            // Фильтрация местоположений по радиусу
            $filteredLocations = $allLocations->filter(function ($location) use ($centerCoordinates, $radius) {
                $distance = $this->haversineGreatCircleDistance(
                    $centerCoordinates[0],
                    $centerCoordinates[1],
                    $location->latitude,
                    $location->longitude
                );

                return $distance <= $radius;
            });

            $foods = $foods->filter(function ($food) use ($filteredLocations) {

                if ($filteredLocations->isNotEmpty()) {
                    return $filteredLocations->contains(function ($filteredLocation) use ($food) {
                        return $food->user_id == $filteredLocation->user_id;
                    });
                }

                return false;
            });

            $foodArray = $foods->values()->toArray();





            if ($filteredLocations->isEmpty()) {
                return response()->json([
                    'message' => 'No locations found within the specified radius',
                    'data' => null
                ], 400);
            }

            return response()->json([
                'message' => 'foods retrieved successfully',
                'data' => [
                    'foods' => $foodArray,
                    'user' => $user,
                    'location' => $locations
                ]
            ], 200);
        }

    }



    public function foodsWithLocations()
    {
        $userData = User::with('foods')->get()->map(function ($user) {
            return [
                'user' => [

                    'name' => $user->name,

                ],
                'locations' => $user->locations,
                'foods' => $user->foods->map(function ($food) {
                    return [
                        'food_id' => $food->id,
                        'name' => $food->title,
                        'price' => $food->price,

                    ];
                }),
            ];
        });

        Log::info($userData);
        if (!$userData) {
            return response()->json([
                'message' => 'foods not found',
                'data' => null
            ], 404);
        }
        return response()->json([
            'message' => 'foods retrieved successfully',
            'data' => $userData
        ], 200);
    }

    public function create(Request $request)
    {

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'delivery' => 'required|boolean',
        ]);

        $user = auth()->user();

        // $seller = Seller::where('user_id', $user->id)->first();
        if (!$user) {
            return response()->json([
                'message' => 'Failed to create order',
                'data' => null
            ]);
        }

        $order = $user->foods()->create([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'delivery' => $validatedData['delivery'],
        ]);

        $locations = $user->locations()->first();
        // $foods = $seller->foods();
        $order->locationsFood()->create([
            'latitude' => $locations->latitude,
            'longitude' => $locations->longitude,


        ]);




        if (!$order) {
            return response()->json([
                'message' => 'Failed to create order',
                'data' => null
            ]);
        }

        return response()->json([
            'message' => 'Order created successfully',
            'data' => $order,

        ]);
    }

    function haversineGreatCircleDistance($latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo)
    {
        $earthRadius = 6371000; // Радиус Земли в метрах

        // Преобразование градусов в радианы
        $latFrom = deg2rad($latitudeFrom);
        $lonFrom = deg2rad($longitudeFrom);
        $latTo = deg2rad($latitudeTo);
        $lonTo = deg2rad($longitudeTo);

        // Разности координат
        $latDelta = $latTo - $latFrom;
        $lonDelta = $lonTo - $lonFrom;

        // Формула Haversine
        $a = sin($latDelta / 2) * sin($latDelta / 2) +
            cos($latFrom) * cos($latTo) *
            sin($lonDelta / 2) * sin($lonDelta / 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return $earthRadius * $c;
    }

    public function delete(Request $request)
    {


        Log::info($request->all());
        $validatedData = $request->validate([
            'id' => 'required|integer',
        ]);

        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'message' => 'Failed to delete order',
                'data' => null
            ]);
        }

        $order = $user->foods()->find($validatedData['id']);

        if (!$order) {
            return response()->json([
                'message' => 'Order not found',
                'data' => null
            ]);
        }

        $order->delete();

        return response()->json([
            'message' => 'Order deleted successfully',
            'data' => null
        ]);
    }


    public function edit(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|integer',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'delivery' => 'required|boolean',
        ]);

        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'message' => 'Failed to update order',
                'data' => null
            ]);
        }

        $order = $user->foods()->find($validatedData['id']);

        if (!$order) {
            return response()->json([
                'message' => 'Order not found',
                'data' => null
            ]);
        }

        $order->update([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'delivery' => $validatedData['delivery'],
        ]);

        return response()->json([
            'message' => 'Order updated successfully',
            'data' => $order
        ]);
    }


}
