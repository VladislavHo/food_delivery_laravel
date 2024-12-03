<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Sellers;

class Food extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'delivery',
        'price'


    ];

    public function sellers()
    {
        return $this->belongsTo(User::class);
    }

    public function locationsFood()
    {
        return $this->hasMany(LocationFood::class);
    }
}
