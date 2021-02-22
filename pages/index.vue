<template>
  <div class="container mx-auto">
    <div class="md:px-12 px-4 pb-4 flex flex-col" v-if="$auth.loggedIn && scope != 'none'">
      <div class="flex flex-row items-center space-x-3">
        <h1 class="md:text-4xl text-3xl font-semibold">Monitors</h1>
        <button class="text-white bg-secondary hover:bg-primary transition-colors duration-150 w-6 rounded-full h-6" v-on:click="addMonitorButton()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>    
      <div class="text-red-500">{{ error }}</div>        
      <div class="monitors" v-if="monitors">
        <Monitor v-for="monitor in monitors" v-bind:key="monitor.id" v-bind:monitor="monitor"/>
      </div>    
    </div>
    <div class="md:px-12 px-4 pb-4 flex flex-col" v-if="$auth.loggedIn && scope == 'none'">
      <div class="flex flex-row items-center space-x-3">
        <h1 class="md:text-4xl text-3xl font-semibold">Become Beta-Access Tester</h1>
      </div>    
      <div class="text-lg flex flex-col">
        <p>The LazyShoeBot Monitor is still in Beta-Phase an you can becoma a Beta-Tester for free!</p>
        <button class="bg-primary hover:bg-secondary transition-colors duration-150 text-white rounded-full p-1 px-2 mx-auto mt-4" @click="becomeBeta">Become Beta-Tester</button>
        <div class="text-red-500 text-center">{{ error }}</div> 
      </div>
    </div>
    <div class="md:px-12 px-4 pb-4 flex flex-col justify-center items-center my-8 text-xl" v-if="!$auth.loggedIn">
      <p class="mb-4">Please log in!</p>
      <nuxt-link class="bg-primary text-white rounded py-2 px-4" to="/login">Login</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import Monitor from '../components/Monitor.vue';

@Component({
  components: { Monitor }
})
export default class Index extends Vue {
  $auth;
  $router;

  @Action getScope;
  @Action setBetaScope;
  @Action getMonitors;
  @Action addMonitor;
  @Getter scope;
  @Getter monitors;

  error = '';

  async mounted() {
    if (this.$auth.loggedIn) {
      let accessToken = this.$auth.strategy.token.get();
      this.error = await this.getScope({ accessToken });
      if (this.error === '') {
        if (this.scope != 'none') {
          this.error = await this.getMonitors({ accessToken });
          if (this.error != '')
            setTimeout(() => this.error = '', 5000);
        }
      } else
        setTimeout(() => this.error = '', 5000);
    }
  }

  async addMonitorButton() {
    this.error = await this.addMonitor({ accessToken: await this.$auth.strategy.token.get() });
    setTimeout(() => this.error = '', 5000);
  }

  async becomeBeta() {
    let accessToken = this.$auth.strategy.token.get();
    this.error = await this.setBetaScope({ accessToken });
    if (this.error === '') {
      this.$router.push('/logout');
    } else
      setTimeout(() => this.error = '', 5000);
  }
}
</script>