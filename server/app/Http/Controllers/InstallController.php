<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class InstallController extends Controller
{
    public function install(Request $request)
    {
        sleep(1);
        $username = $request->get('u');
        $password = $request->get('p');
        if (User::query()->count() > 0) {
            return [
                'success' => false,
            ];
        }
        User::query()->create([
            'name' => $username,
            'username' => $username,
            'password' => Hash::make($password),
            'email' => ''
        ]);
        return [
            'success' => true,
        ];
    }
}
