export default {
  // UI
  getTheme(state) {
    return state.theme
  },
  isLoading(state) {
    return state.loading
  },
  isDebug(state) {
    return state.debug
  },
  getRefreshInterval(state) {
    return state.refreshInterval
  },
  getVersion(state) {
    return state.version
  },

  // System Info
  getSystemInfo(state) {
    return state.state.info
  },
  getHostname(state) {
    return state.state.info?.hostname || null
  },
  getCapabilities(state) {
    return state.state.info?.capabilities || []
  },
  getHeapInfo(state) {
    return state.state.info?.heap || null
  },

  /** CAPABILITY CHECKS **/
  hasCapability: (state) => (capability) => {
    return state.state.info?.capabilities?.includes(capability) || false
  },

  hasEthernet(state) {
    return state.state.info?.capabilities?.includes('ethernet') || false
  },

  hasWifi(state) {
    return state.state.info?.capabilities?.includes('wifi') || false
  },

  hasSdCard(state) {
    return state.state.info?.capabilities?.includes('sdcard') || false
  },

  hasWebServer(state) {
    return state.state.info?.capabilities?.includes('webserver') || false
  },

  hasMqtt(state) {
    return state.state.info?.capabilities?.includes('mqtt') || false
  },

  hasOpenTherm(state) {
    return state.state.info?.capabilities?.includes('opentherm') || false
  },

  hasRf433(state) {
    return state.state.info?.capabilities?.includes('rf433') || false
  },

  hasOneWire(state) {
    return state.state.info?.capabilities?.includes('onewire') || false
  },

  hasAlarm(state) {
    return state.state.info?.capabilities?.includes('alarm') || false
  },

  hasNtc1(state) {
    return state.state.info?.capabilities?.includes('ntc1') || false
  },

  hasNtc2(state) {
    return state.state.info?.capabilities?.includes('ntc2') || false
  },

  hasAi1(state) {
    return state.state.info?.capabilities?.includes('ai1') || false
  },

  hasAi2(state) {
    return state.state.info?.capabilities?.includes('ai2') || false
  },

  hasOpenCollectors(state) {
    return state.state.info?.capabilities?.includes('opencollectors') || false
  },

  hasOc1(state) {
    return state.state.info?.capabilities?.includes('oc1') || false
  },

  hasOc2(state) {
    return state.state.info?.capabilities?.includes('oc2') || false
  },

  hasBuzzer(state) {
    return state.state.info?.capabilities?.includes('buzzer') || false
  },

  hasInputs(state) {
    return state.state.info?.capabilities?.includes('inputs') || false
  },

  hasInput: (state) => (inputNumber) => {
    return state.state.info?.capabilities?.includes(`inp${inputNumber}`) || false
  },

  hasOutputs(state) {
    return state.state.info?.capabilities?.includes('outputs') || false
  },

  hasOutput: (state) => (outputNumber) => {
    return state.state.info?.capabilities?.includes(`out${outputNumber}`) || false
  },

  // ADC
  getAdcState(state) {
    return state.state.adc
  },
  getAdcChannel0(state) {
    return state.state.adc?.channels?.find(c => c.id === 0)
  },
  getAdcChannel1(state) {
    return state.state.adc?.channels?.find(c => c.id === 1)
  },

  // NTC
  getNtcState(state) {
    return state.state.ntc
  },
  getNtcChannel0(state) {
    return state.state.ntc?.channels?.find(c => c.id === 0)
  },
  getNtcChannel1(state) {
    return state.state.ntc?.channels?.find(c => c.id === 1)
  },

  // DIO
  getDioState(state) {
    return state.state.dio
  },
  getInputs(state) {
    return state.state.dio?.inputs || []
  },
  getOutputs(state) {
    return state.state.dio?.outputs || []
  },
  getRelayState: (state) => (index) => {
    const relay = state.state.dio?.outputs?.find(r => r.config_index === index || r.port_index === index)
    return relay?.state || relay?.default_state || 0
  },

  // OneWire
  getOneWireState(state) {
    return state.state.ow
  },
  getOneWireSensors(state) {
    return state.state.ow || []
  },

  // RF433
  getRf433State(state) {
    return state.state.rf
  },
  getRf433Devices(state) {
    return state.state.rf?.devices || []
  },

  // OpenTherm
  getOpenThermState(state) {
    return state.state.ot
  },
  getOpenThermCharts(state) {
    return state.charts.ot
  },
  getBoilerTemperature(state) {
    return state.state.ot?.boiler_temperature || 0
  },
  getModulation(state) {
    return state.state.ot?.modulation || 0
  },
  getFlameOn(state) {
    return state.state.ot?.flame_on || false
  },
  getPressure(state) {
    return state.state.ot?.pressure || 0
  },

  // Charts
  getCharts(state) {
    return state.charts
  },
  getAdcCharts(state) {
    return {
      time: state.charts.time,
      adc1: state.charts.adc1,
      adc2: state.charts.adc2
    }
  },
  getNtcCharts(state) {
    return {
      time: state.charts.time,
      ntc1: state.charts.ntc1,
      ntc2: state.charts.ntc2
    }
  },
  getOneWireCharts(state) {
    return {
      time: state.charts.timeOw,
      sensors: state.charts.ow
    }
  }
}
