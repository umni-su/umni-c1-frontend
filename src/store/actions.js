import axios from 'axios'
import dateToStringDateTime from "@/helpers/dateToStringDateTime.js"

window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
const API = '/api/'

export default {
  /** GET /api/systeminfo **/
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

  /** GET /api/conf?section=adc **/
  async getAdcConf({ commit, state }) {
    if (state.loading) return false
    commit('setLoading', true)

    const res = await axios.get(`${API}conf`, {
      params: { section: 'adc' }
    }).finally(() => {
      commit('setLoading', false)
    })

    if (res?.data?.success) {
      commit('setAdcConf', res.data.data)

      // Получаем значения каналов для графиков
      const datetime = dateToStringDateTime()
      const channels = res.data.data.channels || []
      const adc1 = channels.find(c => c.id === 0)?.value
      const adc2 = channels.find(c => c.id === 1)?.value
      commit('pushAdcData', { datetime, adc1, adc2 })
    }
  },

  /** GET /api/conf?section=ntc **/
  async getNtcConf({ commit, state }) {
    if (state.loading) return false
    commit('setLoading', true)

    const res = await axios.get(`${API}conf`, {
      params: { section: 'ntc' }
    }).finally(() => {
      commit('setLoading', false)
    })

    if (res?.data?.success) {
      commit('setNtcConf', res.data.data)

      const channels = res.data.data.channels || []
      const ntc1 = channels.find(c => c.id === 0)?.value?.toFixed(2)
      const ntc2 = channels.find(c => c.id === 1)?.value?.toFixed(2)
      commit('pushNtcData', { ntc1, ntc2 })
    }
  },

  /** GET /api/conf?section=dio **/
  async getDioConf({ commit, state }) {
    if (state.loading) return false
    commit('setLoading', true)

    const res = await axios.get(`${API}conf`, {
      params: { section: 'dio' }
    }).finally(() => {
      commit('setLoading', false)
    })

    if (res?.data?.success) {
      commit('setDioConf', res.data.data)
    }
  },

  /** GET /api/conf?section=onewire **/
  async getOneWireConf({ commit, state }) {
    if (state.loading) return false
    commit('setLoading', true)

    const res = await axios.get(`${API}conf`, {
      params: { section: 'onewire' }
    }).finally(() => {
      commit('setLoading', false)
    })

    if (res?.data?.success) {
      const datetime = dateToStringDateTime()
      const sensors = res.data.data.sensors || []

      commit('updateOneWireChart', { datetime, sensors })
      commit('setOneWireConf', res.data.data)
    }
  },

  /** GET /api/conf?section=rf433 **/
  async getRf433Conf({ commit, state }) {
    if (state.loading) return false
    commit('setLoading', true)

    const res = await axios.get(`${API}conf`, {
      params: { section: 'rf433' }
    }).finally(() => {
      commit('setLoading', false)
    })

    if (res?.data?.success) {
      commit('setRf433Conf', res.data.data)
    }
  },

  /** POST /api/state { capability: "opentherm" } **/
  async getOpenThermState({ commit, state }) {
    if (state.loading) return false
    commit('setLoading', true)

    const res = await axios.post(`${API}state`, {
      capability: 'opentherm'
    }).finally(() => {
      commit('setLoading', false)
    })

    if (res?.data?.success) {
      const datetime = dateToStringDateTime()
      const modulation = res.data.data.modulation
      const temperature = res.data.data.boiler_temperature

      commit('pushOpenThermData', { datetime, modulation, temperature })
      commit('setOpenThermData', res.data.data)
    }
  },

  /** POST /api/settings **/
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

  /** POST /api/switch **/
  async switchRelay({ commit }, { mode, index, level }) {
    commit('setLoading', true)

    const res = await axios.post(`${API}switch`, {
      mode,      // 'outputs' или 'opencollectors'
      index,     // 1-8
      level      // 0 или 1
    }).finally(() => {
      commit('setLoading', false)
    })

    if (res?.data?.success) {
      commit('updateRelayState', { index, state: level })
      return res.data
    }
    return null
  },

  /** POST /api/beep **/
  async beep({ commit, state }, { count, on_ms, off_ms }) {
    if (state.loading) return false
    commit('setLoading', true)

    const res = await axios.post(`${API}beep`, {
      count,    // количество сигналов (>=1)
      on_ms,    // длительность сигнала в мс (0-1000)
      off_ms    // пауза между сигналами в мс (0-1000)
    }).finally(() => {
      commit('setLoading', false)
    })

    if (res?.data?.success) {
      return res.data
    }
    return null
  },

  /** ЗАГРУЗКА ВСЕХ ДАННЫХ **/
  async loadAllData({ dispatch, state }) {
    const capabilities = state.state.info?.capabilities || []

    // Всегда загружаем systeminfo
    await dispatch('getSystemInfo')

    // Загружаем конфигурации в зависимости от capabilities
    if (state.hasAi1 || state.hasAi2) {
      await dispatch('getAdcConf')
    }

    if (state.hasNtc1 || state.hasNtc2) {
      await dispatch('getNtcConf')
    }

    if (capabilities.includes('outputs') || capabilities.includes('inputs')) {
      await dispatch('getDioConf')
    }

    if (capabilities.includes('onewire')) {
      await dispatch('getOneWireConf')
    }

    if (capabilities.includes('rf433')) {
      await dispatch('getRf433Conf')
    }

    if (capabilities.includes('opentherm')) {
      await dispatch('getOpenThermState')
    }
  },

  resetCharts({ commit }) {
    commit('resetCharts')
  }
}
