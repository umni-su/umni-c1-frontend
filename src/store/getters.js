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

  // System Info (/api/systeminfo)
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

  getOutputs(state) {
    return state.state.conf.outputs || []
  },
  getInputs(state) {
    return state.state.conf.inputs || []
  },
  getOpenCollectors(state) {
    return state.state.conf.opencollectors || []
  },

  // Проверка capabilities
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
  hasOpenCollectors: (state) => {
    return state.state.info?.capabilities?.includes(`opencollectors`) || false
  },
  hasOutputs: (state) => {
    return state.state.info?.capabilities?.includes(`outputs`) || false
  },
  hasInputs: (state) => {
    return state.state.info?.capabilities?.includes(`inputs`) || false
  },
  hasOutput: (state) => (num) => {
    return state.state.info?.capabilities?.includes(`out${num}`) || false
  },
  hasInput: (state) => (num) => {
    return state.state.info?.capabilities?.includes(`inp${num}`) || false
  },

  // Конфигурации (/api/conf)
  getAdcConf(state) {
    return state.state.conf.adc
  },
  getNtcConf(state) {
    return state.state.conf.ntc
  },
  getDioConf(state) {
    return state.state.conf.dio
  },

  getState:(state) => (key) => {
    return state.state.sensorData[key] || null
  },

  getRelayState: (state) => (index) => {
    const relay = state.state.conf.dio?.outputs?.find(r => r.config_index === index || r.port_index === index)
    return relay?.state !== undefined ? relay.state : relay?.default_state || 0
  },
  getOneWireConf(state) {
    return state.state.conf.onewire
  },
  getOneWireSensors(state) {
    return state.state.conf.onewire?.sensors || []
  },
  getRf433Conf(state) {
    return state.state.conf.rf433
  },
  getRf433Devices(state) {
    return state.state.conf.rf433?.devices || []
  },

  // Данные сенсоров (/api/state)
  getOpenThermData(state) {
    return state.state.sensorData.opentherm
  },
  getBoilerTemperature(state) {
    return state.state.sensorData.opentherm?.boiler_temperature || 0
  },
  getModulation(state) {
    return state.state.sensorData.opentherm?.modulation || 0
  },
  getFlameOn(state) {
    return state.state.sensorData.opentherm?.flame_on || false
  },
  getPressure(state) {
    return state.state.sensorData.opentherm?.pressure || 0
  },
  getCentralHeatingActive(state) {
    return state.state.sensorData.opentherm?.central_heating_active || false
  },
  getHotWaterActive(state) {
    return state.state.sensorData.opentherm?.hot_water_active || false
  },

  // Charts
  getCharts(state) {
    return state.charts
  },
  getOpenThermCharts(state) {
    return state.charts.opentherm
  }
}
