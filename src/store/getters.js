export default {
  getVersion(state) {
    return state.version
  },
  getMacname(state) {
    return state.macname
  },
  getHostname(state) {
    return state.hostname
  },
  isLoading(state) {
    return state.loading
  },
  isDebug(state) {
    return state.debug
  },
  isAuthenticated(state) {
    return state.authenticated
  },
  isInstalled(state) {
    return state.installed
  },
  getTheme(state) {
    return state.theme
  },
  getRefreshInterval(state) {
    return state.refreshInterval
  },
  getSystemInfoState(state) {
    return state.state.info
  },
  getOneWireState(state) {
    return state.state.ow
  },
  getRfState(state) {
    return state.state.rf
  },
  getDioState(state) {
    return state.state.dio
  },
  getAiState(state) {
    return state.state.ai
  },
  getCharts(state) {
    return state.charts
  },
  getOpenThermCharts(state) {
    return state.charts.ot
  },
  getOpenThermState(state) {
    return state.state.ot
  },
  getSettings(state) {
    return state.settings
  },
  getOneWireSettings(state) {
    return state.settings?.ow
  },
  getApiSettings(state) {
    return state.settings?.api
  },
  getDoSettings(state) {
    return state.settings?.do
  },
  getDiSettings(state) {
    return state.settings?.di
  },
  getAnalogSettings(state) {
    return state.settings?.ai
  },
  getSystemSettings(state) {
    return state.settings?.system
  },
  getNetworkSettings(state) {
    return state.settings?.network
  },
  getNotifications(state) {
    return state.notifications
  },
}
