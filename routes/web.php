<?php

use App\Http\Middleware\AdminPonelMiddlware;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
// Route::get('/', function () {
//     return view('welcome');
// });


Auth::routes();

Route::get('/', function () {
    if (auth()->user())
        return redirect('/profile');
    return redirect('/cards');
});
Route::get('{page}', action: [\App\Http\Controllers\MainController::class, 'index'])->where('page', '.*');


Route::middleware('auth')->group(function () {
    // Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
    // Route::get('/dashboard', [App\Http\Controllers\AdminController::class, 'index'])->name('admin.dashboard');
    // Route::get('/user/dashboard', [App\Http\Controllers\UserController::class, 'index'])->name('user.dashboard');

    // Route::delete('/users/{id}', [App\Http\Controllers\UserController::class, 'destroy'])->name('users.destroy');
});

