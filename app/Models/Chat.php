<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_id',
        'receiver_id',
    ];


    public function messages()
    {
        return $this->hasMany(Message::class);
    }
    public function initiator()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
    public function recipient()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
