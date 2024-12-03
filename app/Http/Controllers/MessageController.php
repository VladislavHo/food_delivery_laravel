<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chat;
use App\Models\Message;
use Log;
use App\Events\MessageSent;


class MessageController extends Controller
{
    public function index($chatId)
    {
        // Логируем запрашиваемый ID чата
        

        // Получаем чат по ID
        $chat = Chat::find($chatId);

        // Проверяем, существует ли чат
        if (!$chat) {
            return response()->json(['message' => 'Chat not found'], 404);
        }

        // Логируем найденный чат


        // Получаем все сообщения, связанные с этим чатом, включая отправителей и получателей
        $messages = $chat->messages()->with(['sender', 'receiver'])->get();

        $messages = $messages->map(function ($message) {
            return [
                'id' => $message->id,
                'chat_id' => $message->chat_id,
                'sender_id' => $message->sender_id,
                'receiver_id' => $message->receiver_id,
                'message' => $message->message,
                'created_at' => $message->created_at,
                'updated_at' => $message->updated_at,
                'sender' => $message->sender,
                'receiver' => $message->receiver,
                'user_id' => auth()->id(),
            ];
        });

        // Логируем полученные сообщения
        return response()->json([
            'data' => $messages,
        ], 200);
    }

    public function create(Request $request)
    {


        // Находим чат по ID
        $chat = Chat::find($request->chatId);
        if (!$chat) {
            return response()->json(['message' => 'Chat not found'], 404);
        }



        // Создаём новое сообщение
        $message = Message::create([
            'chat_id' => $chat->id,
            'sender_id' => auth()->id(),
            'receiver_id' => $chat->sender_id === auth()->id() ? $chat->receiver_id : $chat->sender_id,
            'message' => $request->message,


        ]);

        Log::info('message' . $message);


        $formattedMessage = [
            'id' => $message->id,
            'chat_id' => $message->chat_id,
            'sender_id' => $message->sender_id,
            'receiver_id' => $message->receiver_id,
            'message' => $message->message,
            'created_at' => $message->created_at,
            'updated_at' => $message->updated_at,
            'sender' => $message->sender,
            'receiver' => $message->receiver,
            'user_id' => $chat->sender_id !== auth()->id() ? $chat->receiver_id : $chat->sender_id,
        ];
        // Log::info('formattedMessage' . $formattedMessage);
        broadcast(new MessageSent($formattedMessage))->toOthers();

        return response()->json(['message' => 'Message sent successfully', 'data' => $formattedMessage], 200);
    }
}
