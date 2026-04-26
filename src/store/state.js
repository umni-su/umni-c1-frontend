export default {
  theme: localStorage.getItem('theme') !== null ? localStorage.getItem('theme') : 'light',
  loading: false,
  debug: false,

  state: {
    info: null,           // /api/systeminfo
    conf: {
      adc: null,          // конфигурация ADC
      ntc: null,          // конфигурация NTC
      dio:null,
      inputs: [],
      outputs: [],
      opencollectors:[],
      onewire: null,      // конфигурация OneWire
      rf433: null         // конфигурация RF433
    },
    sensorData: {
      opentherm: null     // данные с POST /api/state {capability: "opentherm"}
    }
  },

  charts: {
    time: [],             // общий массив времени для adc/ntc
    adc1: [],             // значение ADC канал 0
    adc2: [],             // значение ADC канал 1
    ntc1: [],             // значение NTC канал 0
    ntc2: [],             // значение NTC канал 1
    timeOw: [],           // массив времени для onewire
    ow: [],               // массив серий датчиков onewire
    opentherm: {
      modulation: [],     // [(time, value), ...]
      temperature: []     // температура котла
    }
  },

  version: null,
  refreshInterval: 5000
}
