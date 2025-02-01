<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Relay extends Model
{
    protected $fillable = [
        'state',
        'index',
        'label'
    ];
}
