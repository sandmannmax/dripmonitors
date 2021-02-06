import Vue from 'vue';
import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';

let instance;

export const getInstance = () => instance;

export const useAuth0 = ({
  onRedirectCallback = (appState) => window.history.replaceState({}, document.title, window.location.pathname),
  redirectUri = window.location.origin,
  ...pluginOptions
}) => {
  if (instance) return instance;

  instance = new Vue({
    data() {
      return {        
        auth0Client: null as unknown as Auth0Client,
        isLoading: true,
        isAuthenticated: false,
        user: {} as unknown,
        error: null
      }
    },
    methods: {
      async handleRedirectCallback() {
        this.isLoading = true;
        try {
          await this.auth0Client.handleRedirectCallback();
          this.user = await this.auth0Client.getUser();
          this.isAuthenticated = true;
        } catch (error) {
          this.error = error;
        } finally {
          onRedirectCallback({});
          this.isLoading = false;
        }
      },
      async loginWithRedirect(options) {
        return await this.auth0Client.loginWithRedirect(options);
      },  
      logout(options) {
        return this.auth0Client.logout(options);
      },  
      async getTokenSilently(o) {
        return await this.auth0Client.getTokenSilently(o);
      }
    },
    async created() {
      this.auth0Client = await createAuth0Client({
        ...pluginOptions,
        domain: pluginOptions.domain,
        client_id: pluginOptions.clientId,
        audience: pluginOptions.audience,
        redirect_uri: redirectUri,
      });

      if (window.location.search.includes("code=") && window.location.search.includes("state="))
        this.handleRedirectCallback();
      else
        this.isLoading = false;
    }
  });

  return instance;
};

/**
 *  Vue Plugin Definition
 */

export const Auth0Plugin = {
  install(Vue, options) {
    Vue.prototype.$auth = useAuth0(options);
  },
};