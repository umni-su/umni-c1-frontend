<?php

namespace App\Http\Controllers;

use App\Models\Input;
use App\Models\Nvs;
use App\Models\OneWireSensor;
use App\Models\Relay;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class NvsController extends Controller
{
    protected Collection $config;

    public function __construct()
    {
        $this->config = Nvs::all();
    }

    protected function get(string $key, mixed $default = null): mixed
    {
        return $this->config->first(function ($item) use ($key) {
            return $item->exists && $item->key === $key;
        })?->value;
    }

    public function getSettings()
    {
        return [
            'system' =>
                [
                    'name' => $this->get('name', 'umni-c-one.loc'),
                    'upd' => (int)$this->get('upd', 1), // 1 - stable, 2 - beta channel
                    'tz' => $this->get('tz', 'UTC+3'),
                    'ntp' => $this->get('ntp'),
                    'adm' => User::query()->first()?->username,
                ],
            'network' => [
                'et' => (int)$this->get('et', 1),//1 - DHCP 2 - static ip
                'eip' => $this->get('eip'),
                'enm' => $this->get('enm'),
                'egw' => $this->get('egw'),
                'edns' => $this->get('edns'),
                'wt' => (int)$this->get('wt', 1),//1 - DHCP 2 - static ip
                'wip' => $this->get('wip'),
                'wnm' => $this->get('wnm'),
                'wgw' => $this->get('wgw'),
                'wdns' => $this->get('wdns'),
                'stname' => $this->get('stname'), // sta ssid name
                'stpwd' => $this->get('stpwd'), // sta ssid password
            ],
            'ot' => [
                'en' => true,
                'hwsp' => fake()->randomFloat(2, 30, 60),
                'tbsp' => fake()->randomFloat(2, 30, 80),
            ],
            'do' => Relay::query()->select(['index', 'state', 'label'])->get(),
            'di' => Input::query()->select(['index', 'state', 'label'])->get(),
            'ai' => null, // ANALOG PORTS,
            'ow' => OneWireSensor::query()->select(['sn', 'label', 'active'])->get(),
        ];
    }

    public function saveSettings(Request $request)
    {
        $type = $request->get('type');
        $data = $request->get('data');
        switch ($type) {
            case 'system':
            case 'network':
                foreach ($data as $key => $value) {
                    Nvs::query()->updateOrCreate(['key' => $key], ['value' => $value]);
                }
                break;

            case 'sensors':
                foreach ($data as $key => $conf) {
                    switch ($key) {
                        case 'do':
                            foreach ($data['do'] as $do) {
                                $_do = Relay::query()->where('index', $do['index'])->first();
                                $_do->label = $do['label'];
                                $_do->save();
                            }
                            break;

                        case 'di':
                            foreach ($data['di'] as $di) {
                                $_di = Input::query()->where('index', $di['index'])->first();
                                $_di->label = $di['label'];
                                $_di->save();
                            }
                            break;
                    }
                }
                break;
            case '1wire':
                $sensors = $data;
                $del = $request->get('del');
                if (!empty($del)) {
                    OneWireSensor::query()->whereIn('sn', $del)->delete();
                }
                foreach ($sensors as $sensor) {
                    $s = OneWireSensor::query()->where('sn', $sensor['sn'])->first();
                    $s->label = $sensor['label'];
                    $s->save();
                }
                break;
        }

        return ['success' => true];
    }
}
