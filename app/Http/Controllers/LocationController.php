<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;
class LocationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth')->except(['create']);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function create(Request $request)
    {


        $request->validate([
            'location' => 'required|array',
            'location.0' => 'required|numeric',
            'location.1' => 'required|numeric',
            'country' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'house' => 'required|string|max:255',
        ]);

        $user = auth()->user();

        if (!$user) {
            redirect('/cards');
            return response()->json([
                'message' => 'Failed to create location',
                'data' => null
            ], 400);
        }
        $latitude = $request->location[0];
        $longitude = $request->location[1];



        $user->locations()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'latitude' => $latitude,
                'longitude' => $longitude,
                'country' => $request->country,
                'city' => $request->city,
                'street' => $request->street,
                'house' => $request->house,
            ]
        );

        $user->save();

        return response()->json($user, 200);
    }
}
