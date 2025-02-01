import axios from 'axios'

window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
const ADMIN = '/adm/'

export default {
  async checkAuth({commit}) {
    commit('setLoading', true)
    const url = `${ADMIN}auth/check`
    const res = await axios.get(url).catch(() => {
      commit('setAuthenticated', false)
    }).finally(() => {
      commit('setLoading', false);
    })
    if (res) {
      commit('setAuthenticated', res?.data?.success)
      commit('setInstalled', res?.data?.installed)
    }
  },
  async install({commit}, data) {
    commit('setLoading', true)
    const res = await axios.post(`${ADMIN}install`, data).finally(() => {
      commit('setLoading', false);
    })
    if (res) {
      if (res.data.success === true) {
        commit('setInstalled', true)
      }
    }
  },
  async logIn({commit}, data) {
    commit('setLoading', true)
    const res = await axios.post(`${ADMIN}auth/login`, data).finally(() => {
      commit('setLoading', false);
    })
    if (res) {
      commit('setAuthenticated', true)
    }
  },
  async logOut({commit}) {
    commit('setLoading', true)
    const res = await axios.get(`${ADMIN}auth/logout`).finally(() => {
      commit('setLoading', false);
    })
    if (res) {
      commit('setAuthenticated', false)
    }
  },
  /** STATE **/
  async getSystemInfoState({commit}) {
    commit('setLoading', true)
    const res = await axios.get(`${ADMIN}st/info`).finally(() => {
      commit('setLoading', false);
    })
    if (res) {
      commit('setSystemInfoState', res.data)
    }
  },
  async getOpenThermState({commit}) {
    commit('setLoading', true)
    const res = await axios.get(`${ADMIN}st/ot`).finally(() => {
      commit('setLoading', false);
    })
    if (res) {
      commit('setOpenThermState', res.data)
    }
  },
  async getOneWireState({commit}) {
    commit('setLoading', true)
    const res = await axios.get(`${ADMIN}st/ow`).finally(() => {
      commit('setLoading', false);
    })
    if (res) {
      commit('setOneWireState', res.data)
    }
  },
  async getDioState({commit}) {
    commit('setLoading', true)
    const res = await axios.get(`${ADMIN}st/dio`).finally(() => {
      commit('setLoading', false);
    })
    if (res) {
      commit('setDioState', res.data)
    }
  },
  async getNvsSettings({commit}) {
    commit('setLoading', true)
    const res = await axios.get(`${ADMIN}settings`).finally(() => {
      commit('setLoading', false);
    })
    commit('setSettings', res.data)
    return res.data
  },
  async saveNvsSettings({commit}, data) {
    commit('setLoading', true)
    const res = await axios.post(`${ADMIN}settings`, data).finally(() => {
      commit('setLoading', false);
    })
    if (res) {
      return res.data
    }
  },
  async setState({commit}, data) {
    commit('setLoading', true)
    const res = await axios.post(`${ADMIN}st`, data).finally(() => {
      commit('setLoading', false);
    })
    if (res) {
      switch (data.type) {
        case 'ot':
          commit('setOpenThermState', data.state)
          break;
        case 'dio':
          commit('updateRelayState', data.state)
          break;
        default:
          break
      }
      return res.data
    }
  }
}
