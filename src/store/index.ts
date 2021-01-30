import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';
import config from '../config';

Vue.use(Vuex)

const refresh = async (refreshToken) => {
  let response, data, error;
  let api_url = config.api_url ? config.api_url : 'https://api.lazyshoebot.com'
  try {
    response = await axios.post(api_url + '/auth/refresh', { refreshToken });
    if (response && response.status == 200)
      data = response.data.accessToken;
    else
      error = { message: 'Failed loading response in getMonitor', response };
  } catch (err) {
    error = { message: 'Error refresh', err };
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
    user: undefined,
    proxies: undefined,
    monitors: undefined,
  },
  getters: {
    user: state => state.user,
    proxies: state => state.proxies,
    monitors: state => state.monitors,
  },
  actions: {
    async login({ commit }, { username, password }) {
      let user, error, response;
      let api_url = config.api_url ? config.api_url : 'https://api.lazyshoebot.com'
      try {
        response = await axios.post(api_url + '/auth/login', {username, password});
        if (response && response.status == 200) {
          user = {
            name: response.data.user.username,
            id: response.data.user._id,
            mail: response.data.user.mail,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken
          };
          commit('setUser', user);
        } else
          console.log(response);
        return '';
      }
      catch (err) {
        if (err.response) {
          console.log(err.response);
          error = err.response.data.message;
        } else {
          error = 'Unexpected Error with connecting to the API';
        }
        return error;
      };
    },
    async getProxies({ commit }, { accessToken, refreshToken }) {
      let user, error, response;
      let api_url = config.api_url ? config.api_url : 'https://api.lazyshoebot.com'
      try {
        response = await axios.get(api_url + '/proxy', {headers: {'Authorization': `Bearer ${accessToken}`}});
        if (response && response.status == 200) {
          let proxies = response.data.proxies;
          commit('setProxies', proxies);
        } else
          console.log(response);
        return '';
      }
      catch (err) {
        if (err.response) {
          console.log(err.response);
          error = err.response.data.message;
        } else {
          error = 'Unexpected Error with connecting to the API';
        }
        return error;
      };
    },
    async addProxy({ commit }, { address, port, accessToken, refreshToken }) {
      let user, error, response;
      let api_url = config.api_url ? config.api_url : 'https://api.lazyshoebot.com'
      try {
        response = await axios.post(api_url + '/proxy', { address, port }, {headers: {'Authorization': `Bearer ${accessToken}`}});
        if (response && response.status == 200) {
          let proxy = response.data.proxy;
          commit('addProxy', proxy);
        } else {
          console.log(response);
          return response.data.message;
        }
        return '';
      }
      catch (err) {
        if (err.response) {
          console.log(err.response);
          error = err.response.data.message;
        } else {
          error = 'Unexpected Error with connecting to the API';
        }
        return error;
      };
    },
    async getMonitors({ commit }, { accessToken, refreshToken }) {
      let user, error, response;
      let api_url = config.api_url ? config.api_url : 'https://api.lazyshoebot.com'
      try {
        response = await axios.get(api_url + '/monitor', {headers: {'Authorization': `Bearer ${accessToken}`}});
        if (response && response.status == 200) {
          let monitors = response.data.monitors;
          commit('setMonitors', monitors);
        } else
          console.log(response);
        return '';
      }
      catch (err) {
        if (err.response) {
          console.log(err.response);
          error = err.response.data.message;
        } else {
          error = 'Unexpected Error with connecting to the API';
        }
        return error;
      };
    },
    async createJob({ commit }, { monitorId, interval, accessToken, refreshToken }) {
      let user, error, response;
      let api_url = config.api_url ? config.api_url : 'https://api.lazyshoebot.com'
      try {
        response = await axios.post(api_url + '/monitor/job', { monitorId, interval }, {headers: {'Authorization': `Bearer ${accessToken}`}});
        if (response && response.status == 200) {
          let job = response.data.job;
          commit('setMonitorJob', { monitorId, job });
        } else
          console.log(response);
        return '';
      }
      catch (err) {
        if (err.response) {
          console.log(err.response);
          error = err.response.data.message;
        } else {
          error = 'Unexpected Error with connecting to the API';
        }
        return error;
      };
    },
    async deleteJob({ commit }, { monitorId, accessToken, refreshToken }) {
      let user, error, response;
      let api_url = config.api_url ? config.api_url : 'https://api.lazyshoebot.com'
      try {
        response = await axios.delete(api_url + '/monitor/job', {headers: {'Authorization': `Bearer ${accessToken}`}, data: { monitorId }});
        if (response && response.status == 200) {
          commit('deleteMonitorJob', monitorId);
        } else
          console.log(response);
        return '';
      }
      catch (err) {
        if (err.response) {
          console.log(err.response);
          error = err.response.data.message;
        } else {
          error = 'Unexpected Error with connecting to the API';
        }
        return error;
      };
    },
    async logout({ commit }, { accessToken, refreshToken }) {
      let response;
      let api_url = config.api_url ? config.api_url : 'https://api.lazyshoebot.com'
      try {
        response = await axios.post(api_url + '/auth/logout', null, {headers: {'Authorization': `Bearer ${accessToken}`}});
        if (response && response.status == 200) {
          commit('setUser', undefined);
        } else
          console.log(response);
        return '';
      } catch (err) {
        if (err.response) {
          console.log(err.response);
          let r = await refresh(refreshToken);
          if (r.data) {
            accessToken = r.data;
            commit('setAccessToken', accessToken);
            response = await axios.post(api_url + '/auth/logout', null, {headers: {'Authorization': `Bearer ${accessToken}`}})
            if (response && response.status == 200) {
              commit('setUser', undefined);
              commit('setServicesAccess', []);
              return '';
            } else
              console.log(response);
            return 'Fehler';
          } else
            return 'Refresh not working';
        }
      }
    },
  },
  mutations: {
    setUser: (state: any, user) => { 
      state.user = user;
    },
    setProxies: (state: any, proxies) => {
      state.proxies = proxies;
    },
    addProxy: (state: any, proxy) => {
      state.proxies = [...state.proxies, proxy];
    },
    setMonitors: (state: any, monitors) => {
      state.monitors = monitors;
    },
    setMonitorJob: (state: any, { monitorId, job }) => {
      let monitors = [...state.monitors];
      for (let i = 0; i < monitors.length; i++) {
        if (monitors[i].monitor._id == monitorId)
          monitors[i].job = job;
      }
      state.monitors = [...monitors];
    },
    deleteMonitorJob: (state: any, monitorId) => {
      let monitors = [...state.monitors];
      for (let i = 0; i < monitors.length; i++) {
        if (monitors[i].monitor._id == monitorId)
          monitors[i].job = null;
      }
      state.monitors = [...monitors];
    },
    setAccessToken: (state: any, accessToken) => { 
      state.user.accessToken = accessToken;
    },
  },
})
