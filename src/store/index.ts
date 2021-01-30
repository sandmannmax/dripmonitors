import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
import config from '../config';

Vue.use(Vuex);

const requestBetaAccess = async ({ mail }) => {
  let response, data, error;
  let api_url = config.api_url ? config.api_url : 'https://api.lazyshoebot.com'
  try {
    response = await axios.post(api_url + '/monitor/betaaccess', { mail });
    if (response && response.status == 200)
      data = response.data.message;
    else
      error = { message: 'Failed response requesting Beta-Access', response };
  } catch (err) {
    error = { message: 'Error requestBetaAccess', err };
  }
  return { data, error };
}

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    betaRequestSent: false,
  },
  getters: {
    betaRequestSent: state => state.betaRequestSent,
  },
  actions: {
    async requestBetaAccess({ commit }, { mail }) {
      let response = await requestBetaAccess({ mail });
      if (response.data) {
        commit('setBetaRequestSent');
        return '';
      } else if (response.error) {
        console.log(response.error);
        return response.error.err.message;
      } else {
        console.log('Unknown Error in requestBetaAccess');
        return 'Unknown Error';
      }
    },
  },  
  mutations: {
    setBetaRequestSent: (state: any) => { 
      state.betaRequestSent = true;
    },
  }
});