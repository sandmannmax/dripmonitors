import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
import config from '../config';

Vue.use(Vuex);

export default () => new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    scope: 'none',
    monitors: [],
    products: [],
    monitorpages: [],
    monitorpagesAdmin: [],
    proxiesAdmin: []
  },
  getters: {
    scope: state => state.scope,
    monitors: state => state.monitors,
    products: state => state.products,
    monitorpages: state => state.monitorpages,
    monitorpagesAdmin: state => state.monitorpagesAdmin,
    proxiesAdmin: state => state.proxiesAdmin
  },
  actions: {
    async getScope({ commit }, { accessToken }) {
      let response, data;
      try {
        response = await axios.get(config.api_url + '/scope', {headers: {'Authorization': accessToken}});
        if (response && response.status == 200)
          data = response.data.scope;
        else if (response && response.data && response.data.message)
          return response.data.message;
        else
          return `Error ${JSON.stringify(response)}`;
      } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message)
          return err.response.data.message;
        return JSON.stringify(err);
      }
      if (data) {
        commit('setScope', data);
        return '';
      }
      return 'Unexpected Error';
    },
    async setBetaScope({ commit }, { accessToken }) {
      let response, data;
      try {
        response = await axios.post(config.api_url + '/scope', null, {headers: {'Authorization': accessToken}});
        if (response && response.status == 200)
          data = response.data.message;
        else if (response && response.data && response.data.message)
          return response.data.message;
        else
          return `Error ${JSON.stringify(response)}`;
      } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message)
          return err.response.data.message;
        return JSON.stringify(err);
      }
      if (data) {
        commit('setScope', 'ct2');
        return '';
      }
      return 'Unexpected Error';
    },
    async getMonitors({ commit }, { accessToken }) {
      let response, data;
      try {
        response = await axios.get(config.api_url + '/monitor', {headers: {'Authorization': accessToken}});
        if (response && response.status == 200)
          data = response.data.monitors;
        else if (response && response.data && response.data.message)
          return response.data.message;
        else
          return `Error ${JSON.stringify(response)}`;
      } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message)
          return err.response.data.message;
        return JSON.stringify(err);
      }
      if (data) {
        commit('setMonitors', data);
        return '';
      }
      return 'Unexpected Error';
    },
    async getMonitorsources({ commit }, { id, accessToken }) {
      let response, data;
      try {
        response = await axios.get(config.api_url + '/monitor/' + id + '/source', {headers: {'Authorization': accessToken}});
        if (response && response.status == 200)
          data = response.data.monitorsources;
        else if (response && response.data && response.data.message)
          return response.data.message;
        else
          return `Error ${JSON.stringify(response)}`;
      } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message)
          return err.response.data.message;
        return JSON.stringify(err);
      }
      if (data) {
        commit('setMonitorsources', { id, monitorsources: data });
        return '';
      }
      return 'Unexpected Error';
    },
    async updateMonitor({ commit }, { id, webHook, botName, botImage, role, accessToken }) {
      let response, data, error;
      try {
        response = await axios.patch(config.api_url + '/monitor/' + id, { webHook, botName, botImage, role }, {headers: {'Authorization': accessToken}});
        if (response && response.status == 200)
          data = response.data.monitor;
        else if (response && response.data && response.data.message)
          return response.data.message;
        else
          return `Error ${JSON.stringify(response)}`;
      } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message)
          return err.response.data.message;
        return JSON.stringify(err);
      }
      if (data) {
        commit('updateMonitor', data);
        return '';
      }
      return 'Unexpected Error';
    },
    async updateMonitorRunning({ commit }, { id, running, accessToken }) {
      let response, data, error;
      try {
        response = await axios.patch(config.api_url + '/monitor/' + id, { running }, {headers: {'Authorization': accessToken}});
        if (response && response.status == 200)
          data = response.data.monitor;
        else if (response && response.data && response.data.message)
          return response.data.message;
        else
          return `Error ${JSON.stringify(response)}`;
      } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message)
          return err.response.data.message;
        return JSON.stringify(err);
      }
      if (data) {
        commit('updateMonitor', data);
        return '';
      }
      return 'Unexpected Error';
    },
    async addMonitor({ commit }, { accessToken }) {
      let response, data, error;
      try {
        response = await axios.post(config.api_url + '/monitor', null, {headers: {'Authorization': accessToken}});
        if (response && response.status == 200)
          data = response.data.monitor;
        else if (response && response.data && response.data.message)
          return response.data.message;
        else
          return `Error ${JSON.stringify(response)}`;
      } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message)
          return err.response.data.message;
        return JSON.stringify(err);
      }
      if (data) {
        commit('addMonitor', data);
        return '';
      }
      return 'Unexpected Error';
    },
    async deleteMonitor({ commit }, { id, accessToken }) {
      let response, data, error;
      try {
        response = await axios.delete(config.api_url + '/monitor/' + id, {headers: {'Authorization': accessToken}});
        if (response && response.status == 200)
          data = 'Success';
        else if (response && response.data && response.data.message)
          return response.data.message;
        else
          return `Error ${JSON.stringify(response)}`;
      } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message)
          return err.response.data.message;
        return JSON.stringify(err);
      }
      if (data) {
        commit('deleteMonitor', id);
        return '';
      }
      return 'Unexpected Error';
    },
    async sendTestmessage({ commit }, { id, accessToken }) {
      let response, data;
      try {
        response = await axios.post(config.api_url + '/monitor/' + id + '/testmessage', null, {headers: {'Authorization': accessToken}});
        if (response && response.status == 200)
          data = 'Success';
        else if (response && response.data && response.data.message)
          return response.data.message;
        else
          return `Error ${JSON.stringify(response)}`;
      } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message)
          return err.response.data.message;
        return JSON.stringify(err);
      }
      if (data) {
        return '';
      }
      return 'Unexpected Error';
    },
    async getProducts({ commit }, { accessToken }) {
      let response, data;
      try {
        response = await axios.get(config.api_url + '/product', {headers: {'Authorization': accessToken}});
        if (response && response.status == 200)
          data = response.data.products;
        else if (response && response.data && response.data.message)
          return response.data.message;
        else
          return `Error ${JSON.stringify(response)}`;
      } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message)
          return err.response.data.message;
        return JSON.stringify(err);
      }
      if (data) {
        commit('setProducts', data);
        return '';
      }
      return 'Unexpected Error';
    },
    async getMonitorpages({ commit }, { accessToken }) {
      let response, data;
      try {
        response = await axios.get(config.api_url + '/monitorpage', {headers: {'Authorization': accessToken}});
        if (response && response.status == 200)
          data = response.data.monitorpages;
        else if (response && response.data && response.data.message)
          return response.data.message;
        else
          return `Error ${JSON.stringify(response)}`;
      } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message)
          return err.response.data.message;
        return JSON.stringify(err);
      }
      if (data) {
        commit('setMonitorpages', data);
        return '';
      }
      return 'Unexpected Error';
    },
    async addMonitorsource({ commit }, { id, all, productId, monitorpageId, accessToken }) {
      let response, data, error;
      try {
        response = await axios.post(config.api_url + '/monitor/' + id + '/source', { all, productId, monitorpageId }, {headers: {'Authorization': accessToken}});
        if (response && response.status == 200)
          data = response.data.monitorsource;
        else if (response && response.data && response.data.message)
          return response.data.message;
        else
          return `Error ${JSON.stringify(response)}`;
      } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message)
          return err.response.data.message;
        return JSON.stringify(err);
      }
      if (data) {
        commit('addMonitorsource', { id, monitorsource: data });
        return '';
      }
      return 'Unexpected Error';
    },
    async deleteMonitorsource({ commit }, { id, monitorsourceId, accessToken }) {
      let response, data, error;
      try {
        response = await axios.delete(config.api_url + '/monitor/' + id + '/source/' + monitorsourceId, {headers: {'Authorization': accessToken}});
        if (response && response.status == 200)
          data = 'Success';
        else if (response && response.data && response.data.message)
          return response.data.message;
        else
          return `Error ${JSON.stringify(response)}`;
      } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message)
          return err.response.data.message;
        return JSON.stringify(err);
      }
      if (data) {
        commit('deleteMonitorsource', { id, monitorsourceId });
        return '';
      }
      return 'Unexpected Error';
    },
    clearData({ commit}) {
      commit('setMonitors', []);
      commit('setProducts', []);
      commit('setMonitorpages', []);
    },
    async getProxiesAdmin({ commit }, { accessToken }) {
      let response, data;
      try {
        response = await axios.get(config.api_url + '/admin/proxy', {headers: {'Authorization': accessToken}});
        if (response && response.status == 200)
          data = response.data.proxies;
        else if (response && response.data && response.data.message)
          return response.data.message;
        else
          return `Error ${JSON.stringify(response)}`;
      } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message)
          return err.response.data.message;
        return JSON.stringify(err);
      }
      if (data) {
        commit('setProxiesAdmin', data);
        return '';
      }
      return 'Unexpected Error';
    },
    async addProxyAdmin({ commit }, { address, accessToken }) {
      let response, data;
      try {
        response = await axios.post(config.api_url + '/admin/proxy', { address }, {headers: {'Authorization': accessToken}});
        if (response && response.status == 200)
          data = response.data.proxy;
        else if (response && response.data && response.data.message)
          return response.data.message;
        else
          return `Error ${JSON.stringify(response)}`;
      } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message)
          return err.response.data.message;
        return JSON.stringify(err);
      }
      if (data) {
        commit('addProxyAdmin', data);
        return '';
      }
      return 'Unexpected Error'; 
    },
    async getMonitorpagesAdmin({ commit }, { accessToken }) {
      let response, data;
      try {
        response = await axios.get(config.api_url + '/admin/monitorpage', {headers: {'Authorization': accessToken}});
        if (response && response.status == 200)
          data = response.data.monitorpages;
        else if (response && response.data && response.data.message)
          return response.data.message;
        else
          return `Error ${JSON.stringify(response)}`;
      } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message)
          return err.response.data.message;
        return JSON.stringify(err);
      }
      if (data) {
        commit('setMonitorpagesAdmin', data);
        return '';
      }
      return 'Unexpected Error';
    },
    async createJobAdmin({ commit }, { monitorpageId, interval, accessToken }) {
      let response, data;
      try {
        response = await axios.post(config.api_url + '/admin/monitorpage/' + monitorpageId + '/start', { interval }, {headers: {'Authorization': accessToken}});
        if (response && response.status == 200)
          data = { monitorpageId, interval };
        else if (response && response.data && response.data.message)
          return response.data.message;
        else
          return `Error ${JSON.stringify(response)}`;
      } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message)
          return err.response.data.message;
        return JSON.stringify(err);
      }
      if (data) {
        commit('setMonitorpageJobAdmin', data);
        return '';
      }
      return 'Unexpected Error';
    },
    async deleteJobAdmin({ commit }, { monitorpageId, accessToken }) {
      let response, data;
      try {
        response = await axios.post(config.api_url + '/admin/monitorpage/' + monitorpageId + '/stop', null, {headers: {'Authorization': accessToken}});
        if (response && response.status == 200)
          data = monitorpageId;
        else if (response && response.data && response.data.message)
          return response.data.message;
        else
          return `Error ${JSON.stringify(response)}`;
      } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message)
          return err.response.data.message;
        return JSON.stringify(err);
      }
      if (data) {
        commit('deleteMonitorpageJobAdmin', data);
        return '';
      }
      return 'Unexpected Error';
    },
  },  
  mutations: {
    setScope: (state: any, scope) => {
      state.scope = scope;
    },
    setMonitors: (state: any, monitors) => {
      monitors.forEach(monitor => {
        if (!monitor.monitorsources)
          monitor.monitorsources = [];
      });
      state.monitors = monitors;
    },
    setMonitorsources: (state: any, { id, monitorsources }) => {
      let monitors = state.monitors;
      monitors[monitors.findIndex(item => item.id === id)].monitorsources = monitorsources;
      state.monitors = [...monitors];
    },
    updateMonitor: (state: any, monitor) => {
      if (!monitor.monitorsources)
          monitor.monitorsources = [];
      let monitors = state.monitors;
      let index = monitors.findIndex(item => item.id === monitor.id);
      monitors[index].running = monitor.running;
      monitors[index].botName = monitor.botName;
      monitors[index].botImage = monitor.botImage;
      monitors[index].webHook = monitor.webHook;
      monitors[index].role = monitor.role;
      state.monitors = [...monitors];
    },
    addMonitor: (state: any, monitor) => {
      if (!monitor.monitorsources)
          monitor.monitorsources = [];
      let monitors = state.monitors;
      state.monitors = [...monitors, monitor];
    },
    deleteMonitor: (state: any, id) => {
      let monitors = state.monitors;
      monitors.splice(monitors.findIndex(item => item.id === id), 1);
      state.monitors = [...monitors];
    },
    setProducts: (state: any, products) => {
      state.products = products;
    },
    setMonitorpages: (state: any, monitorpages) => {
      state.monitorpages = monitorpages;
    },
    addMonitorsource: (state: any, { id, monitorsource }) => {
      let monitors = state.monitors;
      let index = monitors.findIndex(item => item.id === id);
      let monitorsources = monitors[index].monitorsources;
      monitors[index].monitorsources = [...monitorsources, monitorsource];
      state.monitors = [...monitors];
    },
    deleteMonitorsource: (state: any, { id, monitorsourceId }) => {
      let monitors = state.monitors;
      let index = monitors.findIndex(item => item.id === id);
      let monitorsources = monitors[index].monitorsources;
      monitorsources.splice(monitorsources.findIndex(item => item.id == monitorsourceId), 1);
      monitors[index].monitorsources = [...monitorsources];
      state.monitors = [...monitors];
    },
    setProxiesAdmin: (state: any, proxies) => {
      state.proxiesAdmin = proxies;
    },
    addProxyAdmin: (state: any, proxy) => {
      state.proxiesAdmin = [...state.proxiesAdmin, proxy];
    },
    setMonitorpagesAdmin: (state: any, monitorpages) => {
      state.monitorpagesAdmin = monitorpages;
    },
    setMonitorpageJobAdmin: (state: any, { monitorpageId, interval }) => {
      let monitorpages = [...state.monitorpagesAdmin];
      for (let i = 0; i < monitorpages.length; i++) {
        if (monitorpages[i].id == monitorpageId) {
          monitorpages[i].interval = interval;
          monitorpages[i].running = true;
        }
      }
      state.monitorpagesAdmin = [...monitorpages];
    },
    deleteMonitorpageJobAdmin: (state: any, monitorpageId) => {
      let monitorpages = [...state.monitorpagesAdmin];
      for (let i = 0; i < monitorpages.length; i++) {
        if (monitorpages[i].id == monitorpageId) {
          monitorpages[i].interval = 0;
          monitorpages[i].running = false;
        }
      }
      state.monitorpagesAdmin = [...monitorpages];
    },
  }
});