import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    account: null,
  },
  mutations: {
    setAccount(state, payload) {
      state.account = payload;
    },
  },
  actions: {},
  modules: {},
});
