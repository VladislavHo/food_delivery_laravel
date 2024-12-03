<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Log;
class ProfileController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */

    public function index()
    {
        $profile = auth()->user();
        if (!$profile) {
            redirect('/login');
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        return response()->json(['profile' => ['user' => $profile, 'locations' => $profile->locations]], 200);
    }
    public function profile()
    {
        $profile = auth()->user();

        // Проверяем, аутентифицирован ли пользователь
        if (!$profile) {
            redirect('/login');
            return response()->json(['message' => 'Unauthorized'], 401);
        }




            // $sellers = $profile->sellers()->first();
            // if (!$profile) {
            //     redirect('/profile');

            //     return response()->json(['profile' => ['user' => $profile, 'foods' => []]], 200);
            // }
            $foods = $profile->foods()->get();
            return response()->json(['profile' => ['user' => $profile, 'foods' => $foods, 'locations' => $profile->locations]], 200);




    }

    public function users(Request $request)
    {
        $id = $request->id;

        $user = User::find($id);

        return response()->json($user, 200);
    }
}