import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    symbol: 'BNBBTC',
    diff: {}
  },
  mutations: {
    CHANGE_SYMBOL(state, { symbol }) {
      state.symbol = symbol
    },
    UPDATE_MESSAGES(state, { messages }) {
      state.diff = messages
    }
  },
  actions: {},
  modules: {}
})
