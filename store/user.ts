import config from '../config';
import { getRequest, postRequest } from './requests';

export const userModule = {
  namespaced: true,
  state: {
    scope: 'none'    
  },
  getters: {
    scope: state => state.scope    
  },
  actions: {
    async getScope({ commit }, { auth }) {
      let url = config.api_url + '/scope';
      let response = await getRequest({ url, auth });
      if (response && response.data && response.data.scope)
        commit('setScope', response.data.scope);
      if (response && response.message)
        return response.message;
      return '';
    },
    async setBetaScope({ commit }, { accesskey, auth }) {
      let url = config.api_url + '/scope';
      let response = await postRequest({ url, data: { accesskey }, auth });
      if (response && response.data)
        commit('setScope', 'ct2');
      if (response && response.message)
        return response.message;
      return '';
    }  
  },  
  mutations: {
    setScope: (state: any, scope) => {
      state.scope = scope;
    }
  }
}