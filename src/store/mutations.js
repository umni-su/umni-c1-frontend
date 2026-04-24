export default {
  // UI mutations
  setTheme(state, theme) {
    localStorage.setItem('theme', theme)
    state.theme = theme
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setDebug(state, debug) {
    state.debug = debug
  },
  setRefreshInterval(state, interval) {
    state.refreshInterval = interval
  },
  setVersion(state, version) {
    state.version = version
  },

  // System Info
  setSystemInfo(state, info) {
    state.state.info = info
  },

  // ADC
  setAdcState(state, adc) {
    state.state.adc = adc
  },

  // NTC
  setNtcState(state, ntc) {
    state.state.ntc = ntc
  },

  // DIO
  setDioState(state, dio) {
    state.state.dio = dio
  },

  // OneWire
  setOneWireState(state, sensors) {
    state.state.ow = sensors
  },

  // RF433
  setRf433State(state, devices) {
    state.state.rf = devices
  },

  // OpenTherm
  setOpenThermState(state, ot) {
    state.state.ot = ot
  },

  // Charts mutations
  pushAdcData(state, { datetime, adc1, adc2 }) {
    state.charts.time.push(datetime)
    state.charts.adc1.push(adc1)
    state.charts.adc2.push(adc2)

    if (state.charts.time.length > 50) {
      state.charts.time.shift()
      state.charts.adc1.shift()
      state.charts.adc2.shift()
    }
  },

  pushNtcData(state, { ntc1, ntc2 }) {
    // time уже есть из ADC, но для синхронизации используем тот же массив
    if (state.charts.ntc1.length === state.charts.time.length - 1) {
      state.charts.ntc1.push(ntc1)
      state.charts.ntc2.push(ntc2)

      if (state.charts.ntc1.length > 50) {
        state.charts.ntc1.shift()
        state.charts.ntc2.shift()
      }
    }
  },

  pushOpenThermData(state, { datetime, modulation, temperature }) {
    if (typeof modulation === 'number') {
      state.charts.ot.modulation.push([datetime, modulation])
      if (state.charts.ot.modulation.length > 50) {
        state.charts.ot.modulation.shift()
      }
    }

    if (typeof temperature === 'number') {
      state.charts.ot.temperature.push([datetime, temperature])
      if (state.charts.ot.temperature.length > 50) {
        state.charts.ot.temperature.shift()
      }
    }
  },

  updateOneWireChart(state, { datetime, sensors }) {
    // Инициализация графиков для датчиков
    if (state.charts.timeOw.length === 0) {
      state.charts.ow = sensors.map(sensor => ({
        type: 'line',
        name: sensor.label !== null ? sensor.label : sensor.sn,
        sn: sensor.sn,
        smooth: true,
        emphasis: { focus: 'series' },
        symbolSize: 10,
        markPoint: {
          symbolSize: 70,
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        data: [sensor?.temp?.toFixed(2)]
      }))
    } else {
      // Обновление существующих датчиков
      for (const sensor of sensors) {
        const index = state.charts.ow.findIndex(s => s.sn === sensor.sn)
        if (index > -1) {
          const val = sensor?.temp?.toFixed(2)
          state.charts.ow[index].data.push(val)
          if (state.charts.ow[index].data.length > 50) {
            state.charts.ow[index].data.shift()
          }
        }
      }
    }

    state.charts.timeOw.push(datetime)
    if (state.charts.timeOw.length > 50) {
      state.charts.timeOw.shift()
    }
  },

  updateRelayState(state, { index, state: relayState }) {
    if (state.state.dio?.outputs) {
      const relayIndex = state.state.dio.outputs.findIndex(
        r => r.config_index === index || r.port_index === index
      )
      if (relayIndex > -1 && state.state.dio.outputs[relayIndex]) {
        state.state.dio.outputs[relayIndex].state = relayState
      }
    }
  },

  resetCharts(state) {
    state.charts = {
      time: [],
      adc1: [],
      adc2: [],
      ntc1: [],
      ntc2: [],
      timeOw: [],
      ow: [],
      ot: {
        modulation: [],
        temperature: []
      }
    }
  }
}
