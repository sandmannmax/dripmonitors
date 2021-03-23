<template>
  <div class="container mx-auto" v-if="$auth.loggedIn">
    <div class="md:px-12 px-4 pb-4 flex flex-col">
      <h1 class="md:text-4xl text-3xl font-semibold mb-4">Hello {{ $auth.user.nickname }} &#128075;</h1>
      <div v-if="scope != 'none'">
        <h2 class="md:text-3xl text-2xl font-semibold">Running Monitors</h2>
        <div class="text-red-500">{{ error }}</div>
        <div v-if="runningMonitors && runningMonitors.length > 0">
          <MonitorSmall v-for="monitor in runningMonitors" v-bind:key="monitor.id" v-bind:monitor="monitor"/>
        </div> 
        <div v-else>You have no running monitors</div>
        <div class="mt-4">
          <nuxt-link class="text-blue-400 hover:text-blue-700 transition-colors duration-150 text-xl flex items-center" to="/monitor">
            All Monitors
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>         
          </nuxt-link>
        </div>    
      </div>
      <div v-else>
        <div class="flex flex-row items-center space-x-3">
          <h1 class="md:text-3xl text-2xl font-semibold">Become Beta-Access Tester</h1>
        </div>    
        <div class="text-lg flex flex-col">
          <p>The LazyShoeBot Monitor is still in Beta-Phase and you can becoma a Beta-Tester for free! Join our <a class="text-blue-400 hover:text-blue-500 transition-colors duration-150" href="https://www.lazyshoebot.com/discord" target="blank">Discord Server</a> and claim your Accesskey!</p>
          <div class="flex sm:flex-row flex-col mt-2 justify-center items-center sm:space-x-4 space-x-0 sm:space-y-0 space-y-2">
            <input type="text" class="border-2 p-1 rounded-lg sm:w-64 text-center" v-model="accesskey" placeholder="Accesskey">
            <button class="bg-primary hover:bg-secondary transition-colors duration-150 text-white rounded-lg px-2 py-1" @click="becomeBeta">Become Beta-Tester</button>
          </div>
          <div class="text-red-500 text-center">{{ error }}</div> 
        </div>
      </div>
    </div>   
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import MonitorSmall from '../components/MonitorSmall.vue';

const userModule = namespace('userModule');
const monitorModule = namespace('monitorModule');

@Component({
  components: { MonitorSmall }
})
export default class Index extends Vue {
  $auth;
  $router;
  $nuxt;

  @userModule.Action getScope;
  @userModule.Action setBetaScope;
  @userModule.Getter scope;
  @monitorModule.Action getMonitors;
  @monitorModule.Getter monitors;

  accesskey = '';

  get runningMonitors() {
    return this.monitors.filter(monitor => monitor.running == true);
  }

  error = '';

  async mounted() {
    if (this.$auth.loggedIn) {
      await this.load();
    }
  }

  async load() {
    this.error = await this.getScope({ auth: this.$auth });
    if (this.error === '') {
      if (this.scope != 'none') {
        this.error = await this.getMonitors({ auth: this.$auth });
        if (this.error != '')
          setTimeout(() => this.error = '', 5000);
      }
    } else
      setTimeout(() => this.error = '', 5000);
  }

  async becomeBeta() {
    this.error = await this.setBetaScope({ accesskey: this.accesskey, auth: this.$auth });
    if (this.error === '') {
      this.$router.push('/logout');
    } else
      setTimeout(() => this.error = '', 5000);
  }
}
</script>