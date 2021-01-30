import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
import config from '../config';

Vue.use(Vuex);

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

const getMonitor = async accessToken => {
  let response, data, error;
  let api_url = config.api_url ? config.api_url : 'https://api.lazyshoebot.com'
  try {
    response = await axios.get(api_url + '/monitor', {headers: {'Authorization': `Bearer ${accessToken}`}});
    if (response && response.status == 200)
      data = response.data.monitor;
    else
      error = { message: 'Failed loading response in getMonitor', response };
  } catch (err) {
    error = { message: 'Error getMonitor', err };
  }
  return { data, error };
}

const updateMonitor = async ({ webHook, name, imageUrl, accessToken }) => {
  let response, data, error;
  let api_url = config.api_url ? config.api_url : 'https://api.lazyshoebot.com'
  try {
    response = await axios.patch(api_url + '/monitor', {webHook, name, imageUrl}, {headers: {'Authorization': `Bearer ${accessToken}`}});
    if (response && response.status == 200)
      data = response.data.monitor;
    else
      error = { message: 'Failed response updating Monitor', response };
  } catch (err) {
    error = { message: 'Error updateMonitor', err };
  }
  return { data, error };
}

const sendTestmessage = async accessToken => {
  let response, data, error;
  let api_url = config.api_url ? config.api_url : 'https://api.lazyshoebot.com'
  try {
    response = await axios.post(api_url + '/monitor/testmessage', null, {headers: {'Authorization': `Bearer ${accessToken}`}});
    if (response && response.status == 200)
      data = 'Success';
    else
      error = { message: 'Failed loading response in sendTestmessage', response };
  } catch (err) {
    error = { message: 'Error sendTestmessage', err };
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
    monitor: undefined,
  },
  getters: {
    user: state => state.user,
    monitor: state => state.monitor,
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
    async activate({ commit }, { activationCode, username, mail, password }) {
      let user, error, response;
      let api_url = config.api_url ? config.api_url : 'https://api.lazyshoebot.com'
      try {
        response = await axios.post(api_url + '/user', { activationCode, username, mail, password });
        console.log(response)
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
    async updateUser({ commit }, { username, mail, password, oldPassword, accessToken, refreshToken }) {
      let user, error, response;
      let api_url = config.api_url ? config.api_url : 'https://api.lazyshoebot.com'
      try {
        response = await axios.patch(api_url + '/user', {username, mail, password, oldPassword}, {headers: {'Authorization': `Bearer ${accessToken}`}});
        console.log(response)
        if (response && response.status == 200) {
          user = {
            name: response.data.user.username,
            id: response.data.user._id,
            mail: response.data.user.mail,
            accessToken: accessToken,
            refreshToken: refreshToken
          };
          commit('setUser', user);
        } else
          console.log(response);
        return '';    
      }
      catch (err) {
        if (err.response) {
          if (err.response.data.message == '\'oldPassword\' wrong')
            error = 'Altes Passwort ist falsch.';
          else if (err.response.data.message == 'Username already in use')
            error = 'Benutzername wird schon verwendet';
          else if (err.response.data.message == 'Mail already in use')
            error = 'E-Mail Adresse wird schon verwendet';
          else {
            console.log(err.response);
            error = 'Update fehlgeschlagen';
          }
        } else {
          error = 'Unerwarteter Fehler beim erreichen der API ist aufgetreten.';
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
    async getMonitor({ commit }, { accessToken, refreshToken }) {
      let response = await getMonitor(accessToken);
      if (response.data) {
        commit('setMonitorObject', response.data);
        return '';
      } else if (response.error) {
        if (response.error.err.response.data.message === 'Token Expired') {
          let responseRefresh = await refresh(refreshToken);
          if (responseRefresh.data) {
            commit('setAccessToken', responseRefresh.data);
            response = await getMonitor(accessToken);
            if (response.data) {
              commit('setMonitorObject', response.data);
              return '';
            } else if (response.error) {
              console.log(response.error);
            } else {
              console.log('Unbekannter Fehler in getMonitor');
              return 'Fehler';
            }
          } else if (responseRefresh.error) {
            console.log(responseRefresh.error);
            return 'Fehler';
          } else {
            console.log('Unbekannter Fehler in getMonitor-Refresh');
            return 'Fehler';
          }
        } else {
          console.log(response.error);
          return 'Fehler';
        }
      } else {
        console.log('Unbekannter Fehler in getMonitor');
        return 'Fehler';
      }
    },
    async updateMonitor({ commit }, { webHook, botName, botImage, accessToken, refreshToken }) {
      let response = await updateMonitor({ webHook, name: botName, imageUrl: botImage, accessToken });
      if (response.data) {
        commit('setMonitorObject', response.data);
        return '';
      } else if (response.error) {
        if (response.error.err.response.data.message === 'Token Expired') {
          let responseRefresh = await refresh(refreshToken);
          if (responseRefresh.data) {
            commit('setAccessToken', responseRefresh.data);
            response = await updateMonitor({ webHook, name: botName, imageUrl: botImage, accessToken });
            if (response.data) {
              commit('setMonitorObject', response.data);
              return '';
            } else if (response.error) {
              console.log(response.error);
            } else {
              console.log('Unbekannter Fehler in updateMonitor');
              return 'Fehler';
            }
          } else if (responseRefresh.error) {
            console.log(responseRefresh.error);
            return 'Fehler';
          } else {
            console.log('Unbekannter Fehler in updateMonitor-Refresh');
            return 'Fehler';
          }
        } else {
          console.log(response.error);
          return 'Fehler';
        }
      } else {
        console.log('Unbekannter Fehler in updateMonitor');
        return 'Fehler';
      }
    },
    async sendTestmessage({ commit }, { accessToken, refreshToken }) {
      let { data, error } = await sendTestmessage(accessToken);
      if (data) {
        return '';
      } else if (error) {
        console.log(error);
      } else {
        console.log('Unbekannter Fehler in sendTestmessage');
        return 'Fehler';
      }
    },
  },  
  mutations: {
    setUser: (state: any, user) => { 
      state.user = user;
    },
    setAccessToken: (state: any, accessToken) => { 
      state.user.accessToken = accessToken;
    },
    setMonitorObject: (state: any, monitor) => {
      state.monitor = monitor;
    },
  }
});