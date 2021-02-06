import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store';

import { domain, clientId, audience } from "../auth_config.json";
import { Auth0Plugin } from "./auth";

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience
});

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
