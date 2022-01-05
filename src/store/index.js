import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    account: null,
    NFTDetail: null,
    contracts: {
      count: 0,
      data: {},
    },
  },
  mutations: {
    setAccount(state, payload) {
      state.account = payload;
    },
    setNFTDetail(state, payload) {
      state.NFTDetail = payload;
    },
    addContracts(state, payload) {
      for (const [key, value] of Object.entries(payload)) {
        if (!(key in state.contracts)) {
          state.contracts["data"][key] = value;
          state.contracts["count"] += 1;
        }
      }
    },
  },
  actions: {},
  modules: {},
});
