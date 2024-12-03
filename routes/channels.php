<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\Chat;
Broadcast::channel('Chat.{id}', function ($user, $id) {
    $chat = Chat::findOrFail($id);

    return $chat && ($chat->sender_id === $user->id || $chat->receiver_id === $user->id);
});