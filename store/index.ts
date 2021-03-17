import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import config from '../config';
import { monitorModule } from './monitor';
import { userModule } from './user';
import { adminModule } from './admin';
import { getRequest } from './requests';

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
    products: [],
    monitorpages: [],
  },
  getters: {
    products: state => state.products,
    monitorpages: state => state.monitorpages
  },
  actions: {
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
    setProducts: (state: any, products) => {
      state.products = products;
    },
    setMonitorpages: (state: any, monitorpages) => {
      state.monitorpages = monitorpages;
    }
  }
});

