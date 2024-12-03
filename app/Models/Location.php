<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Location extends Model
{
    use HasFactory;
    protected $fillable = ["latitude", "longitude", "country", "city", "street", "house"];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
