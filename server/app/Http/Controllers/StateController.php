<?php

namespace App\Http\Controllers;

use App\Enums\EspRestartReasonEnum;
use App\Models\Input;
use App\Models\Nvs;
use App\Models\OneWireSensor;
use App\Models\Relay;
use Illuminate\Http\Request;

class StateController extends Controller
{
    public function getSystemInfo()
    {
        return json_encode(
            [
                'date' => date("c"),
                'last_reset' => date("c"),
                'reset_reason' => EspRestartReasonEnum::tryFrom(rand(0, count(EspRestartReasonEnum::cases()))),
                'total_heap' => 296743,
                'free_heap' => rand(94271, 296000),
                'chip' => 1,
                'revision' => 123,
                'uptime' => rand(86400000000, 86400000000 * 31),
                'netif' => [
                    [
                        'name' => 'Ethernet',
                        'mac' => 'a2a3b32b42f8',
                        'ip' => '192.168.88.13',
                        'mask' => '255.255.255.0',
                    ],
                    [
                        'name' => 'Wifi AP',
                        'mac' => 'f2a3d35b24c4',
                        'ip' => '192.168.88.215',
                        'mask' => '255.255.255.0',
                    ],
                    [
                        'name' => 'WiFi STA',
                        'mac' => '3d35b22b42f8',
                        'ip' => '192.168.4.3',
                        'mask' => '255.255.255.0',
                    ]
                ],
                'mqtt' => [
                    'success' => true,
                    'server' => 'mqtt://cloud.umni.su'
                ],
                'hostname' => 'controller-01.my.umni.su'
            ]
        );
    }

    public function getOneWireInfo()
    {
        $ar = [];
        $res = OneWireSensor::query()->get(['sn', 'label', 'active']);
        foreach ($res as $oneWireSensor) {
            $ar[] = [
                'sn' => $oneWireSensor->sn,
                'label' => $oneWireSensor->label,
                'val' => fake()->randomFloat(2, 10, 34),
                'fam' => 40,
                'active' => $oneWireSensor->active
            ];
        }
        return $ar;
    }

    public function getDioInfo()
    {
        return [
            'do' => Relay::query()->get(['label', 'state', 'index']),
            'di' => Input::query()->get(['label', 'state', 'index']),
        ];
    }

    public function getOpenThermInfo()
    {
        return [
            'otdhwsp' => Nvs::query()->where(['key' => 'otdhwsp'])->first()?->value ?? 30,
            'ottbsp' => Nvs::query()->where(['key' => 'ottbsp'])->first()?->value ?? 30,
            'ottb' => fake()->numberBetween(30, 80),
            'otch' => fake()->boolean(70),
            'ntc1' => fake()->randomFloat(2, 10, 30),
            'ntc2' => fake()->randomFloat(2, 20, 60),
        ];
    }

    public function setInfoState(Request $request)
    {
        $type = $request->post('type');
        $state = $request->post('state');
        switch ($type) {
            case 'dio':
                Relay::query()->where('index', $state['index'])->update(['state' => $state['state']]);
                break;
            case 'ot':
                Nvs::query()->updateOrCreate(['key' => 'otdhwsp'], ['value' => $state['otdhwsp']]);
                Nvs::query()->updateOrCreate(['key' => 'ottbsp'], ['value' => $state['ottbsp']]);
                break;
        }
        return [
            'success' => true,
        ];
    }
}
