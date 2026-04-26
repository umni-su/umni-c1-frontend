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

  // /api/systeminfo
  setSystemInfo(state, info) {
    state.state.info = info
  },

  // /api/conf
  setAdcConf(state, adc) {
    state.state.conf.adc = adc
  },
  setNtcConf(state, ntc) {
    state.state.conf.ntc = ntc
  },
  setDioConf(state, dio) {
    state.state.conf.dio = dio
  },
  setOneWireConf(state, onewire) {
    state.state.conf.onewire = onewire
  },
  setRf433Conf(state, rf433) {
    state.state.conf.rf433 = rf433
  },

  setOutputs(state, outputs) {
    state.state.conf.outputs = outputs
  },
  setInputs(state, inputs) {
    state.state.conf.inputs = inputs
  },
  setOpenCollectors(state, oc) {
    state.state.conf.opencollectors = oc
  },

  // /api/state
  setOpenThermData(state, data) {
    state.state.sensorData.opentherm = data
  },

  // Charts
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
    state.charts.ntc1.push(ntc1)
    state.charts.ntc2.push(ntc2)

    if (state.charts.ntc1.length > 50) {
      state.charts.ntc1.shift()
      state.charts.ntc2.shift()
    }
  },

  pushOpenThermData(state, { datetime, modulation, temperature }) {
    if (typeof modulation === 'number') {
      state.charts.opentherm.modulation.push([datetime, modulation])
      if (state.charts.opentherm.modulation.length > 50) {
        state.charts.opentherm.modulation.shift()
      }
    }

    if (typeof temperature === 'number') {
      state.charts.opentherm.temperature.push([datetime, temperature])
      if (state.charts.opentherm.temperature.length > 50) {
        state.charts.opentherm.temperature.shift()
      }
    }
  },

  updateOneWireChart(state, { datetime, sensors }) {
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
        data: []
      }))
    }

    for (const sensor of sensors) {
      const index = state.charts.ow.findIndex(s => s.sn === sensor.sn)
      if (index > -1 && sensor.temp) {
        state.charts.ow[index].data.push(sensor.temp.toFixed(2))
        if (state.charts.ow[index].data.length > 50) {
          state.charts.ow[index].data.shift()
        }
      }
    }

    state.charts.timeOw.push(datetime)
    if (state.charts.timeOw.length > 50) {
      state.charts.timeOw.shift()
    }
  },

  updateRelayState(state, { index, state: relayState }) {
    if (state.state.conf.dio?.outputs) {
      const relayIndex = state.state.conf.dio.outputs.findIndex(
        r => r.config_index === index || r.port_index === index
      )
      if (relayIndex > -1 && state.state.conf.dio.outputs[relayIndex]) {
        state.state.conf.dio.outputs[relayIndex].state = relayState
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
      opentherm: {
        modulation: [],
        temperature: []
      }
    }
  }
}
