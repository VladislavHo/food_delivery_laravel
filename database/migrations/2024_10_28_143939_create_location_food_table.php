<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('location_food', function (Blueprint $table) {
            $table->id();


            $table->float('latitude', 10);
            $table->float('longitude', 10);

            $table->index('food_id', 'seller_idx_location_food');
            $table->foreignId('food_id')->references('id')->on('sellers')->onDelete('cascade')->name('seller_fk_location_food');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('location_food');
    }
};
