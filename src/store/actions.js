import axios from 'axios'
import dateToStringDateTime from "@/helpers/dateToStringDateTime.js"

// eslint-disable-next-line no-undef
window.axios = axios
// eslint-disable-next-line no-undef
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
const API = '/api/'

export default {
  /** SYSTEM INFO **/
  async getSystemInfo({ commit, state }) {
    if (state.loading) return false
    commit('setLoading', true)

    const res = await axios.get(`${API}systeminfo`).finally(() => {
      commit('setLoading', false)
    })

    if (res?.data?.success) {
      commit('setSystemInfo', res.data.data)
      if (res.data.data.hostname) {
        const version = res.data.data.hostname.split('-')[1]
        commit('setVersion', version)
      }
    }
  },

  /** ADC **/
  async getAdcState({ commit, state }) {
    if (state.loading) return false
    commit('setLoading', true)

    const res = await axios.get(`${API}adc`).finally(() => {
      commit('setLoading', false)
    })

    if (res?.data?.success) {
      const datetime = dateToStringDateTime()
      const channels = res.data.data.channels || []
      const adc1 = channels.find(c => c.id === 0)?.value
      const adc2 = channels.find(c => c.id === 1)?.value

      commit('pushAdcData', { datetime, adc1, adc2 })
      commit('setAdcState', res.data.data)
    }
  },

  /** NTC **/
  async getNtcState({ commit, state }) {
    if (state.loading) return false
    commit('setLoading', true)

    const res = await axios.get(`${API}ntc`).finally(() => {
      commit('setLoading', false)
    })

    if (res?.data?.success) {
      const channels = res.data.data.channels || []
      const ntc1 = channels.find(c => c.id === 0)?.value?.toFixed(2)
      const ntc2 = channels.find(c => c.id === 1)?.value?.toFixed(2)

      commit('pushNtcData', { ntc1, ntc2 })
      commit('setNtcState', res.data.data)
    }
  },

  /** DIO (Digital Inputs/Outputs) **/
  async getDioState({ commit, state }) {
    if (state.loading) return false
    commit('setLoading', true)

    const res = await axios.get(`${API}dio`).finally(() => {
      commit('setLoading', false)
    })

    if (res?.data?.success) {
      commit('setDioState', res.data.data)
    }
  },

  /** ONEWIRE **/
  async getOneWireState({ commit, state }) {
    if (state.loading) return false
    commit('setLoading', true)

    const res = await axios.get(`${API}onewire`).finally(() => {
      commit('setLoading', false)
    })

    if (res?.data?.success) {
      const datetime = dateToStringDateTime()
      const sensors = res.data.data.sensors || []

      commit('updateOneWireChart', { datetime, sensors })
      commit('setOneWireState', sensors)
    }
  },

  /** RF433 **/
  async getRf433State({ commit, state }) {
    if (state.loading) return false
    commit('setLoading', true)

    const res = await axios.get(`${API}rf433`).finally(() => {
      commit('setLoading', false)
    })

    if (res?.data?.success) {
      commit('setRf433State', res.data.data)
    }
  },

  /** OPENTHERM **/
  async getOpenThermState({ commit, state }) {
    if (state.loading) return false
    commit('setLoading', true)

    const res = await axios.get(`${API}opentherm`).finally(() => {
      commit('setLoading', false)
    })

    if (res?.data?.success) {
      const datetime = dateToStringDateTime()
      const modulation = res.data.data.modulation
      const temperature = res.data.data.boiler_temperature

      commit('pushOpenThermData', { datetime, modulation, temperature })
      commit('setOpenThermState', res.data.data)
    }
  },

  /** SETTINGS (GET и SAVE) **/
  async getSetting({ commit, state }, setting) {
    if (state.loading) return false
    commit('setLoading', true)

    const res = await axios.post(`${API}settings`, { setting }).finally(() => {
      commit('setLoading', false)
    })

    if (res?.data?.success) {
      return res.data.data
    }
    return null
  },

  async saveSetting({ commit }, { setting, values }) {
    commit('setLoading', true)

    const res = await axios.post(`${API}settings`, { setting, values }).finally(() => {
      commit('setLoading', false)
    })

    if (res?.data?.success) {
      return res.data
    }
    return null
  },

  /** SWITCH RELAY **/
  async switchRelay({ commit }, { index, state }) {
    commit('setLoading', true)

    const res = await axios.post(`${API}switch`, {
      type: 'output',
      index,
      state
    }).finally(() => {
      commit('setLoading', false)
    })

    if (res?.data?.success) {
      commit('updateRelayState', { index, state })
      return res.data
    }
    return null
  },

  /** ВСЕ ДАННЫЕ СРАЗУ (для оптимизации) **/
  async getAllData({ dispatch }) {
    await Promise.all([
      dispatch('getSystemInfo'),
      dispatch('getAdcState'),
      dispatch('getNtcState'),
      dispatch('getDioState'),
      dispatch('getOneWireState'),
      dispatch('getRf433State'),
      dispatch('getOpenThermState')
    ])
  },

  /** RESET CHARTS **/
  async resetCharts({ commit }) {
    commit('resetCharts')
  }
}
