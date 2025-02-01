export default {
  theme: localStorage.getItem('theme') !== null ? localStorage.getItem('theme') : 'light',
  loading: false,
  authenticated: false,
  installed: false,
  settings: [],
  notifications: [],
  state: {
    info: null,
    ot: null,
    dio: {
      do: [],
      di: []
    },
    ow: null
  }
}
