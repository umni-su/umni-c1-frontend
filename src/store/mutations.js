export default {
  setVersion(state, version) {
    state.version = version
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setDebug(state, debug) {
    state.debug = debug
  },
  setHostname(state, hostname) {
    state.hostname = hostname
  },
  setMacname(state, macname) {
    state.macname = macname
  },
  setAuthenticated(state, authenticated) {
    state.authenticated = authenticated
  },
  setInstalled(state, installed) {
    state.installed = installed
  },
  setTheme(state, theme) {
    localStorage.setItem('theme', theme)
    state.theme = theme
  },
  setRefreshInterval(state, int) {
    return state.refreshInterval = int
  },
  setSystemInfoState(state, info) {
    state.state.info = info
  },
  setAnalogState(state, ai) {
    state.state.ai = ai
  },
  setRfState(state, rf) {
    state.state.rf = rf
  },
  setDioState(state, info) {
    state.state.dio = info
  },
  updateRelayState(state, relay) {
    const index = state.state.dio.do.findIndex(r => r.index === relay.index)
    if (index > -1) {
      state.state.dio.do[index].state = state.state.dio.do[index].state === 1 ? 0 : 1
    }
  },
  setOneWireState(state, info) {
    state.state.ow = info
  },
  setOpenThermState(state, info) {
    state.state.ot = info
  },
  setSettings(state, settings) {
    state.settings = settings
  },
  addNotification(state, notification) {
    state.notifications.push(notification)
  },
  removeNotification(state) {
    state.notifications = state.notifications.filter(n => n.active === true)
  },
  addSetting(state, {key, value}) {
    const index = state.settings.findIndex(s => s.key === key)
    if (index > -1) {
      state.settings[index][key] = value
    } else {
      state.settings.push({key, value})
    }
  }
}
