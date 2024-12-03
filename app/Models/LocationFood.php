<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class LocationFood extends Model
{
    use HasFactory;
    protected $fillable = ["latitude", "longitude"];
    public function food()
    {
        return $this->belongsTo(Food::class);
    }
}
