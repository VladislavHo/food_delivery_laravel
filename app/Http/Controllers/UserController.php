<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Log;
class UserController extends Controller
{
  /**
   * Create a new controller instance.
   *
   * @return void
   */

  public function __construct()
  {
    $this->middleware('auth:sanctum')->except('index', 'show');
  }

  /**
   * Show the application dashboard.
   *
   * @return \Illuminate\Contracts\Support\Renderable
   */

  public function index()
  {
    // Получаем текущего пользователя
    $currentUserId = auth()->id();

    // Получаем всех пользователей, кроме текущего и с ролью admin
    $users = User::where('id', '!=', $currentUserId)
      ->select('id', 'name', 'email')
      ->where('role', '!=', 'admin') // Предполагается, что поле роли называется 'role'
      ->get();

    return response()->json($users, 200);
  }

  public function show(Request $request)
  {
    $user = User::find($request->id);
    if (!$user) {
      return response()->json(['message' => 'User not found'], 404);
    }
    $foods = $user->foods;
    if(!$foods) {
      return response()->json(['message' => 'Foods not found'], 404);
    }
    return response()->json(['user' => $user, 'foods' => $foods], 200);
  }
}
