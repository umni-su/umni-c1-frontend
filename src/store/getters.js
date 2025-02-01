export default {
  isLoading(state) {
    return state.loading
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
  getSystemInfoState(state) {
    return state.state.info
  },
  getOneWireState(state) {
    return state.state.ow
  },
  getDioState(state) {
    return state.state.dio
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
  getDoSettings(state) {
    return state.settings?.do
  },
  getDiSettings(state) {
    return state.settings?.di
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
