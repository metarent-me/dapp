import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    account: null,
    NFTDetail: null,
    contracts: null,
  },
  mutations: {
    setAccount(state, payload) {
      state.account = payload;
    },
    setNFTDetail(state, payload) {
      state.NFTDetail = payload;
    },
  },
  actions: {},
  modules: {},
});
