<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Message extends Model
{
    use HasFactory;
    protected $fillable = [
        'chat_id',
        'sender_id',
        'receiver_id',
        'message',
    ];
    public function chat()
    {
        return $this->belongsTo(Chat::class);
    }

    // Связь с отправителем
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    // Связь с получателем
    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
