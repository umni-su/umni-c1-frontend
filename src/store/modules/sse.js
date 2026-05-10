import {storage} from "@/store/devices/device_store.js";
import state from "@/store/state.js";

const sseModule = {
  state: {
    messages: [],
    isConnected: false,
    error: null,
    eventSource: null,
    maxMessages: 1000
  },
  getters: {
    recentMessages: (state) => (count = 50) => {
      return state.messages.slice(-count); // Последние N сообщений
    },
    lastMessage: state => {
      if (state.messages.length === 0) return null;
      return state.messages[state.messages.length - 1];
    }
  },
  mutations: {
    addMessage(state, message) {
      state.messages.push({
        id: Date.now(),
        data: message,
        timestamp: new Date().toLocaleString()
      });

      if (state.messages.length > state.maxMessages) {
        state.messages.shift(); // Удаляем самый старый
      }
    },
    setConnected(state, status) {
      state.isConnected = status;
    },
    setError(state, error) {
      state.error = error;
    },
    clearMessages(state) {
      state.messages = [];
    },
    setEventSource(state, source) {
      state.eventSource = source;
    }
  },
  actions: {
    async initSSE({ commit, dispatch }) {
      const activeDevice = await storage.getActiveDevice()
      const url =  `http://${activeDevice.ip}/sse/events`
      const eventSource = new EventSource(url);

      eventSource.onopen = () => {
        commit('setConnected', true);
        commit('setError', null);
        console.log('sse opened', url)
      };

      eventSource.addEventListener('sensor', (event) => {
        try {
          const sensorData = JSON.parse(event.data);
          commit('addMessage', sensorData);
        } catch (error) {
          console.error('Error parsing sensor data:', error);
        }
      });

      eventSource.onerror = (error) => {
        commit('setConnected', false);
        commit('setError', 'Ошибка соединения SSE');
        console.error('SSE error:', error);

        if (eventSource.readyState === EventSource.CLOSED) {
          setTimeout(() => {
            dispatch('initSSE');
          }, 5000);
        }
      };

      // Сохраняем в хранилище для возможности закрытия
      commit('setEventSource', eventSource);
    },
    closeSSE({ state, commit }) {
      if (state.eventSource) {
        commit('clearMessages');
        state.eventSource.close();
        commit('setConnected', false);
      }
    }
  }
};

export default sseModule;
