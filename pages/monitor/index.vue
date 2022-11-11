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
      <div class="md:text-lg text-md">For help watch the <a class="text-blue-400 hover:text-blue-700 transition-colors duration-150" href="https://youtu.be/W7LTBwy59sM" target="blank">Monitor Setup Tutorial</a> or contact mail@lazyshoebot.com</div>      
      <div class="monitors" v-if="monitors">
        <Monitor v-for="monitor in monitors" v-bind:key="monitor.id" v-bind:monitor="monitor"/>
      </div>    
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Monitor from '../../components/Monitor.vue';

const userModule = namespace('userModule');
const monitorModule = namespace('monitorModule');

@Component({
  components: { Monitor }
})
export default class Index extends Vue {
  $auth;
  $router;
  $nuxt;

  @userModule.Action getScope;
  @userModule.Action setBetaScope;
  @userModule.Getter scope;
  @monitorModule.Action getMonitors;
  @monitorModule.Action addMonitor;
  @monitorModule.Getter monitors;

  error = '';

  async mounted() {
    if (this.$auth.loggedIn) {
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
  }

  async addMonitorButton() {
    this.error = await this.addMonitor({ auth: this.$auth });
    setTimeout(() => this.error = '', 5000);
  }

  async becomeBeta() {
    this.error = await this.setBetaScope({ auth: this.$auth });
    if (this.error === '') {
      this.$router.push('/logout');
    } else
      setTimeout(() => this.error = '', 5000);
  }
}
</script>
