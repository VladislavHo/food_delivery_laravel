<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('country')->default(null);
            $table->string('city')->default(null);
            $table->string('street')->default(null);
            $table->string('house')->default(null);
            $table->float('latitude', 10);
            $table->float('longitude', 10);

            $table->index('user_id', 'user_idx_locations');
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade')->name('user_fk_locations');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};
