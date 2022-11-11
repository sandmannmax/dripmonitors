import config from '../config';
import { deleteRequest, getRequest, patchRequest, postRequest } from './requests';

export const adminModule = {
  namespaced: true,
  state: {
    monitorpages: [],
    proxies: []
  },
  getters: {
    monitorpages: state => state.monitorpages,
    proxies: state => state.proxies
  },
  actions: {
    async getMonitorpages({ commit }, { auth }) {
      let url = config.api_url + '/admin/monitorpage';
      let response = await getRequest({ url, auth });
      if (response && response.data && response.data.monitorpages)
        commit('setMonitorpages', response.data.monitorpages);
      if (response && response.message)
        return response.message;
      return '';
    },
    async addMonitorpage({ commit }, { name, functionName, cc, auth }) {
      let url = config.api_url + '/admin/monitorpage';
      let response = await postRequest({ url, data: { name, functionName, cc }, auth });
      if (response && response.data && response.data.monitorpage)
        commit('addMonitorpage', response.data.monitorpage);
      if (response && response.message)
        return response.message;
      return '';
    },
    async updateMonitorpage({ commit }, { monitorpageId, name, cc, functionName, visible, isHtml, auth }) {
      let url = config.api_url + '/admin/monitorpage/' + monitorpageId;
      let response = await patchRequest({ url, data: { name, cc, functionName, visible, isHtml }, auth });
      if (response && response.data && response.data.monitorpage)
        commit('updateMonitorpage', response.data.monitorpage);
      if (response && response.message)
        return response.message;
      return '';
    },
    async startMonitorpage({ commit }, { monitorpageId, interval, auth }) {
      let url = config.api_url + '/admin/monitorpage/' + monitorpageId + '/start';
      let response = await postRequest({ url, data: { interval }, auth });
      if (response && response.data)
        commit('updateMonitorpageRunning', { monitorpageId, interval, running: true });
      if (response && response.message)
        return response.message;
      return '';
    },
    async stopMonitorpage({ commit }, { monitorpageId, auth }) {
      let url = config.api_url + '/admin/monitorpage/' + monitorpageId + '/stop';
      let response = await postRequest({ url, data: null, auth });
      if (response && response.data)
        commit('updateMonitorpageRunning', { monitorpageId, interval: 0, running: false });
      if (response && response.message)
        return response.message;
      return '';
    },
    async testMonitorpage({ commit }, { monitorpageId, reload, auth }) {
      let url = config.api_url + '/admin/monitorpage/' + monitorpageId + '/test';
      let response = await postRequest({ url, data: { reloadContent: reload }, auth });
      if (response && response.message)
        return response.message;
      return '';
    },
    async createUrl({ commit }, { monitorpageId, url, auth }) {
      let urlApi = config.api_url + '/admin/monitorpage/' + monitorpageId + '/url';
      let response = await postRequest({ url: urlApi, data: { url }, auth });
      if (response && response.data && response.data.url)
        commit('addUrl', { monitorpageId, url: response.data.url});
      if (response && response.message)
        return response.message;
      return '';
    },
    async updateUrl({ commit }, { monitorpageId, urlId, url, auth }) {
      let urlApi = config.api_url + '/admin/monitorpage/' + monitorpageId + '/url/' + urlId;
      let response = await patchRequest({ url: urlApi, data: { url }, auth });
      if (response && response.data && response.data.url)
        commit('updateUrl', { monitorpageId, url: response.data.url});
      if (response && response.message)
        return response.message;
      return '';
    },
    async deleteUrl({ commit }, { monitorpageId, urlId, auth }) {
      let url = config.api_url + '/admin/monitorpage/' + monitorpageId + '/url/' + urlId;
      let response = await deleteRequest({ url, auth });
      if (response && response.data)
        commit('removeUrl', { monitorpageId, urlId });
      if (response && response.message)
        return response.message;
      return '';
    },
    async getProxies({ commit }, { auth }) {
      let url = config.api_url + '/admin/proxy';
      let response = await getRequest({ url, auth });
      if (response && response.data && response.data.proxies)
        commit('setProxies', response.data.proxies);
      if (response && response.message)
        return response.message;
      return '';
    },
    async addProxy({ commit }, { address, cc, auth }) {
      let url = config.api_url + '/admin/proxy';
      let response = await postRequest({ url, data: { address, cc }, auth });
      if (response && response.data && response.data.proxy)
        commit('addProxy', response.data.proxy);
      if (response && response.message)
        return response.message;
      return '';
    },
    async deleteProxy({ commit }, { id, auth }) {
      let url = config.api_url + '/admin/proxy/' + id;
      let response = await deleteRequest({ url, auth });
      if (response && response.data)
        commit('removeProxy', id);
      if (response && response.message)
        return response.message;
      return '';
    },
    async getProducts({ commit }, { monitorpageId, auth }) {
      let urlApi = config.api_url + '/admin/monitorpage/' + monitorpageId + '/product';
      let response = await getRequest({ url: urlApi, auth });
      if (response && response.data && response.data.products)
        commit('setProducts', { monitorpageId, products: response.data.products });
      if (response && response.message)
        return response.message;
      return '';
    },
    async activateMonitoringProduct({ commit }, { productId, monitorpageId, auth }) {
      let urlApi = config.api_url + '/admin/monitorpage/' + monitorpageId + '/product/' + productId + '/activate';
      let response = await postRequest({ url: urlApi, data: null, auth });
      if (response && response.data == '')
        commit('activateMonitoringProduct', { productId, monitorpageId });
      if (response && response.message)
        return response.message;
      return '';
    },
    async disableMonitoringProduct({ commit }, { productId, monitorpageId, auth }) {
      let urlApi = config.api_url + '/admin/monitorpage/' + monitorpageId + '/product/' + productId + '/disable';
      let response = await postRequest({ url: urlApi, data: null, auth });
      if (response && response.data == '')
        commit('disableMonitoringProduct', { productId, monitorpageId });
      if (response && response.message)
        return response.message;
      return '';
    },
  },  
  mutations: {
    setMonitorpages: (state: any, monitorpages) => {
      state.monitorpages = monitorpages;
    },
    addMonitorpage: (state: any, monitorpage) => {
      state.monitorpages = [...state.monitorpages, monitorpage];
    },
    updateMonitorpage: (state: any, monitorpage) => {
      let monitorpages = state.monitorpages;
      let index = monitorpages.findIndex(item => item.id === monitorpage.id);
      monitorpages[index] = monitorpage;
      state.monitorpages = [...monitorpages];
    },
    updateMonitorpageRunning: (state: any, { monitorpageId, interval, running }) => {
      let monitorpages = [...state.monitorpages];
      for (let i = 0; i < monitorpages.length; i++) {
        if (monitorpages[i].id == monitorpageId) {
          monitorpages[i].interval = interval;
          monitorpages[i].running = running;
        }
      }
      state.monitorpages = [...monitorpages];
    },
    addUrl: (state: any, { monitorpageId, url }) => {
      let monitorpages = [...state.monitorpages];
      for (let i = 0; i < monitorpages.length; i++) {
        if (monitorpages[i].id == monitorpageId) {
          let urls = monitorpages[i].urls;
          monitorpages[i].urls = [...urls, url];
        }
      }
      state.monitorpages = [...monitorpages];
    },
    updateUrl: (state: any, { monitorpageId, url }) => {
      let monitorpages = [...state.monitorpages];
      for (let i = 0; i < monitorpages.length; i++) {
        if (monitorpages[i].id == monitorpageId) {
          let urls = monitorpages[i].urls;
          for (let j = 0; j < urls.length; j++) {
            if (urls[j].id = url.id) {
              urls[j].url = url.url;
            }
          }
          monitorpages[i].urls = [...urls];
        }
      }
      state.monitorpages = [...monitorpages];
    },
    removeUrl: (state: any, { monitorpageId, urlId }) => {
      let monitorpages = [...state.monitorpages];
      for (let i = 0; i < monitorpages.length; i++) {
        if (monitorpages[i].id == monitorpageId) {
          let urls = monitorpages[i].urls;
          urls.splice(urls.findIndex(item => item.id == urlId), 1);
          monitorpages[i].urls = [...urls];
        }
      }
      state.monitorpages = [...monitorpages];
    },
    setProxies: (state: any, proxies) => {
      state.proxies = proxies;
    },
    addProxy: (state: any, proxy) => {
      state.proxies = [...state.proxies, proxy];
    },
    removeProxy: (state: any, id) => {
      let proxies = state.proxies;
      let index = proxies.findIndex(o => o.id == id);
      if (index != -1) {
        proxies.splice(index, 1);
      }
      state.proxies = [...proxies];
    },
    setProducts: (state: any, { monitorpageId, products }) => {
      let monitorpages = state.monitorpages;
      let index = monitorpages.findIndex(item => item.id === monitorpageId);
      monitorpages[index].products = [...products];
      state.monitorpages = [...monitorpages];
    },
    activateMonitoringProduct: (state: any, { productId, monitorpageId }) => {
      let monitorpages = state.monitorpages;
      let index = monitorpages.findIndex(item => item.id === monitorpageId);
      let products = monitorpages[index].products;
      let productIndex = products.findIndex(item => item.id === productId);
      products[productIndex].monitored = true;
      monitorpages[index].products = [...products];
      state.monitorpages = [...monitorpages];
    },
    disableMonitoringProduct: (state: any, { productId, monitorpageId }) => {
      let monitorpages = state.monitorpages;
      let index = monitorpages.findIndex(item => item.id === monitorpageId);
      let products = monitorpages[index].products;
      let productIndex = products.findIndex(item => item.id === productId);
      products[productIndex].monitored = false;
      monitorpages[index].products = [...products];
      state.monitorpages = [...monitorpages];
    },
  }
}