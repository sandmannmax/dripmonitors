import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import config from '../config';
import { monitorModule } from './monitor';
import { userModule } from './user';
import { adminModule } from './admin';
import { getRequest } from './requests';
import axios from 'axios';

Vue.use(Vuex);

export default () => new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  modules: {
    monitorModule,
    userModule,
    adminModule
  },
  state: {
    apiState: 'offline',
    products: [],
    monitorpages: [],
  },
  getters: {
    apiState: state => state.apiState,
    products: state => state.products,
    monitorpages: state => state.monitorpages
  },
  actions: {
    async getStatus({ commit }) {
      try {
        let response = await axios.get(config.api_url + '/status');
        if (response && response.status == 200)
          commit('setApiState', 'online');
      } catch {
        commit('setApiState', 'offline');
      }
    },
    async getProducts({ commit }, { auth }) {
      let url = config.api_url + '/product';
      let response = await getRequest({ url, auth });
      if (response && response.data && response.data.products)
        commit('setProducts', response.data.products);
      if (response && response.message)
        return response.message;
      return '';
    },
    async getMonitorpages({ commit }, { auth }) {
      let url = config.api_url + '/monitorpage';
      let response = await getRequest({ url, auth });
      if (response && response.data && response.data.monitorpages)
        commit('setMonitorpages', response.data.monitorpages);
      if (response && response.message)
        return response.message;
      return '';
    }
  },  
  mutations: {
    setApiState: (state: any, apiState) => {
      state.apiState = apiState;
    },
    setProducts: (state: any, products) => {
      state.products = products;
    },
    setMonitorpages: (state: any, monitorpages) => {
      state.monitorpages = monitorpages;
    }
  }
});

