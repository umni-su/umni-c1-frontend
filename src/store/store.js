import {createStore} from 'vuex'
import axios from "axios";
import actions from './actions.js'
import state from './state.js'
import mutations from './mutations.js'
import getters from './getters.js'
import sseModule from "@/store/modules/sse.js";

const store = createStore({
  actions,
  mutations,
  getters,
  state,
  modules: {
    sse:sseModule,
  }
})

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.status === 403) {
      // Access denied
      store.state.authenticated = false
    }
    return Promise.reject(err);
  }
);
export default store
