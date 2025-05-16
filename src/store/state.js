export default {
  theme: localStorage.getItem('theme') !== null ? localStorage.getItem('theme') : 'light',
  loading: false,
  debug: false,
  authenticated: false,
  installed: false,
  settings: [],
  notifications: [],
  refreshInterval: 10000,
  hostname: null,
  macname: null,
  state: {
    ai: {},
    info: null,
    rf: null,
    ot: null,
    dio: {
      do: [],
      di: []
    },
    ow: null,
  },
  charts: {
    time: [],
    ntc1: [],
    ntc2: [],
    ai1: [],
    ai2: [],
    ow: [],
    timeOw: [],
    ot: {
      modulation: [],
      ch: []
    }
  },
  version: null
}
