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
        Schema::table('relays', function (Blueprint $table) {
            $table->string('label')->after('state')->nullable();
        });
        Schema::table('inputs', function (Blueprint $table) {
            $table->string('label')->after('state')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('relays', function (Blueprint $table) {
            $table->dropColumn('label');
        });
        Schema::table('inputs', function (Blueprint $table) {
            $table->dropColumn('label');
        });
    }
};
