<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OneWireSensor extends Model
{
    protected $fillable = [
        'label',
        'sn',
        'active'
    ];
}
