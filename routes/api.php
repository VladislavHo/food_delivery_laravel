<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\UserController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');



Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth', [App\Http\Controllers\ProfileController::class, 'index'])->name('auth');
    Route::get('/profile', [App\Http\Controllers\ProfileController::class, 'profile'])->name('profile');
    Route::get('/user/{id}', [App\Http\Controllers\UserController::class, 'show'])->name('user.show');
    Route::post('/order/create', [App\Http\Controllers\FoodsController::class, 'create'])->name('order.create');
    Route::post('/location/create', [App\Http\Controllers\LocationController::class, 'create'])->name('location.create');

    
    
    Route::get('/chats', [App\Http\Controllers\ChatController::class, 'index'])->name('chat.index');
    Route::post('/chat/{friendId}/create', [App\Http\Controllers\ChatController::class, 'create'])->name('chat.create');
    Route::post('/messages/create', [App\Http\Controllers\MessageController::class, 'create'])->name('messages.create');
    
    Route::get('/messages/{chatId}', [App\Http\Controllers\MessageController::class, 'index'])->name('messages.index');
    // Route::delete('/users/{id}', [App\Http\Controllers\ProfileController::class, 'destroy'])->name('users.destroy');
    Route::get('/foods/delete', [App\Http\Controllers\FoodsController::class, 'delete'])->name('foods.delete');
    Route::get('/foods/edit', [App\Http\Controllers\FoodsController::class, 'edit'])->name('foods.edit');
    Route::get('/food/{food_id}', [App\Http\Controllers\FoodsController::class, 'index'])->name('food.index');
    Route::get('/foods/filter', [App\Http\Controllers\FoodsController::class, 'foodsFilter'])->name('foods.filter');
});

Route::get('/foods/location', [App\Http\Controllers\FoodsController::class, 'foodsWithLocations'])->name('foods.location');
Route::get('/foods', [App\Http\Controllers\FoodsController::class, 'foods'])->name('foods.get');

Route::get('/auth/telegram', [App\Telegram\AuthController::class, 'redirectToTelegram']);
Route::post('/auth/telegram/callback', [App\Telegram\AuthController::class, 'handleTelegramCallback']);

