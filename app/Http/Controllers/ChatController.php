<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chat;
use App\Models\User;
use App\Models\Message;
use Log;
class ChatController extends Controller
{
    //

    public function index()
    {
        $user = auth()->user();

        if (!$user) {
            return redirect('/cards');
        }

        $chats = Chat::where('sender_id', $user->id)
            ->orWhere('receiver_id', $user->id)
            ->get();

        if ($chats->isEmpty()) {
            return response()->json([
                'message' => 'Chats not found',
                'data' => null
            ]);
        }


        Log::info($chats);


        $chats = $chats->map(function ($chat) {
            $friendId = $chat->sender_id == auth()->user()->id ? $chat->receiver_id : $chat->sender_id;
            $friend = User::find($friendId);
            $message = Message::where('chat_id', $chat->id)->latest()->first();
            return [
                'id' => $chat->id,
                'friend_id' => $friendId,
                'friend' => $friend->first_name . ' ' . $friend->last_name,
                'message' => $message ? $message->message : null,
                'updated_at' => $message ? $message->updated_at : $chat->created_at
            ];
        });


        return response()->json([
            'message' => 'Chats retrieved successfully',
            'data' => $chats
        ]);
    }

    public function create(Request $request, $friendId)
    {

        $chatID = Chat::where(function ($query) use ($friendId) {
            $query->where('sender_id', auth()->user()->id)
                ->where('receiver_id', $friendId);
        })->orWhere(function ($query) use ($friendId) {
            $query->where('sender_id', $friendId)
                ->where('receiver_id', auth()->user()->id);
        })->first();

        $friend = User::find($friendId);

        if ($chatID) {
            Log::info($chatID . ' chat id');
            return response()->json([
                'chat_id' => $chatID->id,
                'friend' => $friend->name
            ]);
        }
        $chat = Chat::create([
            'sender_id' => auth()->user()->id,
            'receiver_id' => $friendId,

        ]);


        return response()->json([
            'chat_id' => $chat->id,
            'friend' => $friend->name
        ]);
    }
}
