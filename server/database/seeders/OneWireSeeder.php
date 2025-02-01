<?php

namespace Database\Seeders;

use App\Models\OneWireSensor;
use Illuminate\Database\Seeder;

class OneWireSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OneWireSensor::query()->updateOrCreate([
            'sn' => '3c0624544a236228'
        ]);
        OneWireSensor::query()->updateOrCreate([
            'sn' => 'f7062454b2ee5528'
        ]);
        OneWireSensor::query()->updateOrCreate([
            'sn' => '2c062454b3aacb28'
        ]);
        OneWireSensor::query()->updateOrCreate([
            'sn' => '3a062454a9bd1f28'
        ]);
        OneWireSensor::query()->updateOrCreate([
            'sn' => 'd3062454bc6c7f28'
        ]);
    }
}
