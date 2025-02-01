<?php

use App\Http\Controllers\InstallController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\NvsController;
use App\Http\Controllers\StateController;
use Illuminate\Support\Facades\Route;

Route::prefix('adm')->group(function () {
    Route::post('install', [InstallController::class, 'install']);
    Route::prefix('auth')->group(function () {
        Route::get('check', [LoginController::class, 'check']);
        Route::post('login', [LoginController::class, 'login']);
        Route::get('logout', [LoginController::class, 'logout']);
    });
    Route::prefix('st')->group(function () {
        Route::get('info', [StateController::class, 'getSystemInfo']);
        Route::get('ow', [StateController::class, 'getOneWireInfo']);
        Route::get('dio', [StateController::class, 'getDioInfo']);
        Route::get('ot', [StateController::class, 'getOpenThermInfo']);
        Route::post('', [StateController::class, 'setInfoState']);
    });
    Route::prefix('settings')->group(function () {
        Route::get('', [NvsController::class, 'getSettings']);
        Route::post('', [NvsController::class, 'saveSettings']);
    });
});
