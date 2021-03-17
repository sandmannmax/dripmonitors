import axios from 'axios';
import config from '../config';
import { deleteRequest, getRequest, patchRequest, postRequest } from './requests';

export const monitorModule = {
  namespaced: true,
  state: {
    monitors: []
  },
  getters: {
    monitors: state => state.monitors
  },
  actions: {
    async getMonitors({ commit }, { auth }) {
      let url = config.api_url + '/monitor';
      let response = await getRequest({ url, auth });
      if (response && response.data && response.data.monitors)
        commit('setMonitors', response.data.monitors);
      if (response && response.message)
        return response.message;
      return '';
    },
    async addMonitor({ commit }, { auth }) {
      let url = config.api_url + '/monitor';
      let response = await postRequest({ url, data: null, auth });
      if (response && response.data && response.data.monitor)
        commit('addMonitor', response.data.monitor);
      if (response && response.message)
        return response.message;
      return '';
    },
    async updateMonitor({ commit }, { id, webHook, botName, botImage, auth }) {
      let url = config.api_url + '/monitor/' + id;
      let response = await patchRequest({ url, data: { webHook, botName, botImage }, auth });
      if (response && response.data && response.data.monitor)
        commit('updateMonitor', response.data.monitor);
      if (response && response.message)
        return response.message;
      return '';
    },
    async updateMonitorRunning({ commit }, { id, running, auth }) {
      let url = config.api_url + '/monitor/' + id;
      let response = await patchRequest({ url, data: { running }, auth });
      if (response && response.data && response.data.monitor)
        commit('updateMonitor', response.data.monitor);
      if (response && response.message)
        return response.message;
      return '';
    },
    async deleteMonitor({ commit }, { id, auth }) {
      let url = config.api_url + '/monitor/' + id;
      let response = await deleteRequest({ url, auth });
      if (response && response.data)
        commit('removeMonitor', id);
      if (response && response.message)
        return response.message;
      return '';
    },
    async sendTestmessage({ commit }, { id, auth }) {
      let url = config.api_url + '/monitor/' + id + '/testmessage';
      let response = await postRequest({ url, data: null, auth });
      if (response && response.message)
        return response.message;
      return '';
    },
    async addMonitorsource({ commit }, { id, all, productId, monitorpageId, auth }) {
      let url = config.api_url + '/monitor/' + id + '/source';
      let response = await postRequest({ url, data: { all, productId, monitorpageId }, auth });
      if (response && response.data && response.data.monitorsource)
        commit('addMonitorsource', { id, monitorsource: response.data.monitorsource });
      if (response && response.message)
        return response.message;
      return '';
    },
    async deleteMonitorsource({ commit }, { id, monitorsourceId, auth }) {
      let url = config.api_url + '/monitor/' + id + '/source/' + monitorsourceId;
      let response = await deleteRequest({ url, auth });
      if (response && response.data)
        commit('removeMonitorsource', { id, monitorsourceId });
      if (response && response.message)
        return response.message;
      return '';
    },
    async addRole({ commit }, { id, name, roleId, auth }) {
      let url = config.api_url + '/monitor/' + id + '/role';
      let response = await postRequest({ url, data: { name, roleId }, auth });
      if (response && response.data && response.data.role)
        commit('addRole', { id, role: response.data.role });
      if (response && response.message)
        return response.message;
      return '';
    },
    async deleteRole({ commit }, { id, rid, auth }) {
      let url = config.api_url + '/monitor/' + id + '/role/' + rid;
      let response = await deleteRequest({ url, auth });
      if (response && response.data)
        commit('removeRole', { id, rid });
      if (response && response.message)
        return response.message;
      return '';
    }
  },  
  mutations: {
    setMonitors: (state: any, monitors) => {
      monitors.forEach(monitor => {
        if (!monitor.monitorsources)
          monitor.monitorsources = [];
      });
      state.monitors = monitors;
    },
    addMonitor: (state: any, monitor) => {
      if (!monitor.monitorsources)
          monitor.monitorsources = [];
      let monitors = state.monitors;
      state.monitors = [...monitors, monitor];
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
      state.monitors = [...monitors];
    },
    removeMonitor: (state: any, id) => {
      let monitors = state.monitors;
      monitors.splice(monitors.findIndex(item => item.id === id), 1);
      state.monitors = [...monitors];
    },
    addMonitorsource: (state: any, { id, monitorsource }) => {
      let monitors = state.monitors;
      let index = monitors.findIndex(item => item.id === id);
      let monitorsources = monitors[index].monitorsources;
      monitors[index].monitorsources = [...monitorsources, monitorsource];
      state.monitors = [...monitors];
    },
    removeMonitorsource: (state: any, { id, monitorsourceId }) => {
      let monitors = state.monitors;
      let index = monitors.findIndex(item => item.id === id);
      let monitorsources = monitors[index].monitorsources;
      monitorsources.splice(monitorsources.findIndex(item => item.id == monitorsourceId), 1);
      monitors[index].monitorsources = [...monitorsources];
      state.monitors = [...monitors];
    },
    addRole: (state: any, { id, role }) => {
      let monitors = state.monitors;
      let index = monitors.findIndex(item => item.id === id);
      let roles = monitors[index].roles;
      monitors[index].roles = [...roles, role];
      state.monitors = [...monitors];
    },
    removeRole: (state: any, { id, rid }) => {
      let monitors = state.monitors;
      let index = monitors.findIndex(item => item.id === id);
      let roles = monitors[index].roles;
      roles.splice(roles.findIndex(item => item.id == rid), 1);
      monitors[index].roles = [...roles];
      state.monitors = [...monitors];
    }
  }
}