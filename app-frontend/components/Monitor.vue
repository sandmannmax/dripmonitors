<template>
  <div class="border-b-2 border-gray-400 p-4 hover:bg-gray-200 transition-colors duration-150">
    <div class="flex sm:flex-row flex-col items-center space-x-2">
      <img v-bind:src="monitor.botImage" class="rounded-full w-24 h-24" v-if="monitor.botImage"/>
      <img src="logoWide.png" class="rounded-full w-24 h-24 my-auto" v-else/>

      <div class="flex flex-auto flex-col h-auto space-y-2">
        <div class="flex flex-row items-center sm:justify-start justify-center space-x-2">
          <nuxt-link class="text-xl font-semibold hover:text-gray-600 transition-colors duration-150" :to="monitorurl">            
            <h3 v-if="monitor.botName">{{ monitor.botName }}</h3>
            <h3 v-else>LSB Monitor</h3>
          </nuxt-link>

          <Toggle v-bind:value="monitor.running" @input="updateToggle" class="toggle"/> 
        </div>
        <div class="flex flex-wrap sm:justify-start justify-center">
          <MonitorsourceSmall v-for="monitorsource in monitor.monitorsources" v-bind:key="monitorsource.id" v-bind:monitorsource="monitorsource"/>
        </div>
      </div>
      <div class="flex sm:flex-col justify-center">
        <button class="w-8 h-8 bg-secondary hover:bg-primary transition duration-150 rounded-full text-white m-1" v-on:click="message()" >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -3 26 26" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </button>  
        <nuxt-link class="w-8 h-8 bg-secondary hover:bg-primary transition duration-150 rounded-full text-white m-1" :to="monitorurl">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -3 26 26" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </nuxt-link>
      </div>
    </div>
    <div class="error text-center text-red-500">{{ error }}</div>    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Toggle from './Toggle.vue';
import MonitorsourceSmall from './MonitorsourceSmall.vue';

const monitorModule = namespace('monitorModule');

@Component({
  components: {
    Toggle,
    MonitorsourceSmall
  },
  props: {
    monitor: Object
  }
})
export default class Monitor extends Vue {
  $auth;
  monitor;

  @monitorModule.Action sendTestmessage;
  @monitorModule.Action updateMonitorRunning;

  error = '';

  get monitorurl() {
    return '/monitor/' + this.monitor.id;
  }

  async message() {
    this.error = await this.sendTestmessage({ id: this.monitor.id, auth: this.$auth });
    setTimeout(() => this.error = '', 5000);
  }

  toggleValue = false;

  async updateToggle(value) {
    this.error = await this.updateMonitorRunning({ id: this.monitor.id, running: value, auth: this.$auth });
    setTimeout(() => this.error = '', 5000);
  }
 }
</script>