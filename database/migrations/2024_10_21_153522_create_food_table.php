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
        Schema::create('food', function (Blueprint $table) {
            $table->id();
            $table->string('title')->default(null);
            $table->string('description')->default(null);
            $table->boolean('delivery')->default(false);
            // $table->float('price')->default(null);
            $table->timestamps();

            $table->index('user_id', 'user_idx_food');
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade')->name('user_fk_food');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('food');
    }
};
