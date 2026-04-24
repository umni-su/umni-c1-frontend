export default {
  theme: localStorage.getItem('theme') !== null ? localStorage.getItem('theme') : 'light',
  loading: false,
  debug: false,

  state: {
    info: null,        // systeminfo
    adc: null,         // adc channels
    ntc: null,         // ntc channels
    dio: null,         // digital inputs/outputs
    ow: null,          // onewire sensors
    rf: null,          // rf433 devices
    ot: null,          // opentherm status
  },

  charts: {
    time: [],          // общий массив времени для adc/ntc
    adc1: [],          // значение ADC канал 0
    adc2: [],          // значение ADC канал 1
    ntc1: [],          // значение NTC канал 0
    ntc2: [],          // значение NTC канал 1
    timeOw: [],        // массив времени для onewire
    ow: [],            // массив серий датчиков onewire
    ot: {
      modulation: [],  // [(time, value), ...]
      temperature: []  // температура котла
    }
  },

  version: null,
  refreshInterval: 5000
}
