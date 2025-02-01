<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nvs extends Model
{
    protected $fillable = [
        'key',
        'value'
    ];
}
