import axios from 'axios'
import dateToStringDateTime from "@/helpers/dateToStringDateTime.js";

window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
const ADMIN = '/adm/'

export default {
  async checkAuth({commit}) {
    commit('setLoading', true)
    const url = `${ADMIN}auth/check`
    const res = await axios.get(url).catch(e => {
      commit('setAuthenticated', false)
      commit('setInstalled', e.response.data.installed)
      commit('setMacname', e.response.data.macname)
    }).finally(() => {
      commit('setLoading', false);
    })
    if (res) {
      commit('setMacname', res?.data?.macname)
      commit('setHostname', res?.data?.hostname)
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
      commit('setAuthenticated', res.data.success)
      commit('setMacname', res.data?.macname)
      commit('setHostname', res.data?.hostname)
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
  async reboot({commit}) {
    commit('setLoading', true)
    const res = await axios.get(`${ADMIN}reboot`).finally(() => {
      commit('setLoading', false);
    })
    return res.data
  },
  async factoryReset({commit}) {
    commit('setLoading', true)
    const res = await axios.get(`${ADMIN}reset`).finally(() => {
      commit('setLoading', false);
    })
    return res.data
  },
  /** STATE **/
  async getSystemInfoState({commit, state}) {
    if (state.loading) return false
    commit('setLoading', true)
    const res = await axios.get(`${ADMIN}st/info`).finally(() => {
      commit('setLoading', false);
    })
    if (res) {
      commit('setSystemInfoState', res.data)
    }
  },
  async getAnalogState({commit, state}) {
    if (state.loading) return false
    commit('setLoading', true)
    const res = await axios.get(`${ADMIN}st/ai`).finally(() => {
      commit('setLoading', false);
    })
    if (res) {
      const dateStr = dateToStringDateTime()
      state.charts.time.push(dateStr)
      state.charts.ntc1.push(res.data.ntc1?.value?.toFixed(2))
      state.charts.ntc2.push(res.data.ntc2?.value?.toFixed(2))
      state.charts.ai1.push(res.data.ai1?.value)
      state.charts.ai2.push(res.data.ai2?.value)
      if (state.charts.time.length > 50) {
        state.charts.time.shift()
        state.charts.ntc1.shift()
        state.charts.ntc2.shift()
        state.charts.ai1.shift()
        state.charts.ai2.shift()
      }
      commit('setAnalogState', res.data)
    }
  },
  async getOpenThermState({commit, state}) {
    if (state.loading) return false
    commit('setLoading', true)
    const res = await axios.get(`${ADMIN}st/ot`).finally(() => {
      commit('setLoading', false);
    })
    if (res) {
      commit('setOpenThermState', res.data)
      const dateStr = dateToStringDateTime()
      const modulation = res.data.modulation
      const chTemp = res.data.boiler_temperature

      if (typeof modulation === 'number') {
        state.charts.ot.modulation.push([dateStr, modulation])
        if (state.charts.ot.modulation.length > 50) {
          state.charts.ot.modulation.shift()
        }
      }
      if (typeof chTemp === 'number') {
        state.charts.ot.ch.push([dateStr, chTemp])
        if (state.charts.ot.ch.length > 50) {
          state.charts.ot.ch.shift()
        }
      }
    }
  },
  async getRfState({commit, state}) {
    if (state.loading) return false
    commit('setLoading', true)
    const res = await axios.get(`${ADMIN}st/rf`).finally(() => {
      commit('setLoading', false);
    })
    if (res) {
      commit('setRfState', res.data)
    }
  },
  async scanRfSensors({commit, state}) {
    if (state.loading) return false
    commit('setLoading', true)
    const res = await axios.get(`${ADMIN}rf/scan`).finally(() => {
      commit('setLoading', false);
    })
    if (res) {
      return res.data
    }
  },
  async resetBoilerErrors({commit}) {
    commit('setLoading', true)
    const res = await axios.post(`${ADMIN}st/ot/reset`).finally(() => {
      commit('setLoading', false);
    })
    if (res) {
      return res.data
    }
  },
  async getOneWireState({commit, state}) {
    if (state.loading) return false
    commit('setLoading', true)
    const res = await axios.get(`${ADMIN}st/ow`).finally(() => {
      commit('setLoading', false);
    })
    if (res) {
      const dateStr = dateToStringDateTime()
      if (state.charts.timeOw.length === 0) {
        state.charts.ow = res.data.map(ow => {
          const val = ow?.temp?.toFixed(2)
          return {
            type: 'line',
            name: ow.label !== null ? ow.label : ow.sn,
            sn: ow.sn,
            smooth: true,
            emphasis: {
              focus: 'series'
            },
            symbolSize: 10,
            markPoint: {
              symbolSize: 70,
              data: [
                {type: 'max', name: 'Max'},
                {type: 'min', name: 'Min'}
              ]
            },
            data: [val]
          }
        })
      } else {
        for (const ow of res.data) {
          const index = state.charts.ow.findIndex(sensor => sensor.sn === ow.sn)
          if (index > -1) {
            const val = ow?.temp?.toFixed(2)
            state.charts.ow[index].data.push(val)
            if (state.charts.ow[index].data.length > 50) {
              state.charts.ow[index].data.shift()
            }
          }
        }
      }
      state.charts.timeOw.push(dateStr)
      //state.charts.ow.push(res.data.ntc1?.temp?.toFixed(2))
      if (state.charts.timeOw.length > 50) {
        state.charts.timeOw.shift()
      }
      commit('setOneWireState', res.data)
    }
  },
  async getDioState({commit, state}) {
    if (state.loading) return false
    commit('setLoading', true)
    const res = await axios.get(`${ADMIN}st/dio`).finally(() => {
      commit('setLoading', false);
    })
    if (res) {
      commit('setDioState', res.data)
    }
  },
  async getNvsSettings({commit, state}) {
    if (state.loading) return false
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
    if (res && res.status === 200) {
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
          //commit('setOpenThermState', data.state)
          break;
        case 'dio':
          commit('updateRelayState', data.state)
          break;
        default:
          break
      }
      return res.data
    }
  },

  async startUpdates({commit}, data) {
    commit('setLoading', true)
    const res = await axios.post(`${ADMIN}update`, data).finally(() => {
      commit('setLoading', false);
    })
    if (res) {
      return res.data
    }
  },
}
