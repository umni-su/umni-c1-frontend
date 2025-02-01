<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function check()
    {
        return [
            'installed' => User::query()->count() > 0,
            'success' => true,
        ];
    }

    public function login(Request $request)
    {
        $username = $request->get('u');
        $password = $request->get('p');
        if (Auth::attempt(['username' => $username, 'password' => $password])) {
            return [
                'installed' => true,
                'success' => true,
            ];
        }
        return [
            'success' => false,
        ];
    }

    public function logout()
    {
        Auth::logout();
        return [
            'success' => true,
        ];
    }
}
