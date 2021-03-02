<template>
  <div class="border-b-2 border-gray-400 my-4 p-4">
    <div class="flex">
      <div class="flex flex-col items-center justify-around">
        <img v-bind:src="monitor.botImage" class="rounded-full w-24" v-if="monitor.botImage"/>
        <img src="logoWide.png" class="rounded-full w-24" v-else/>
        <Toggle v-bind:value="monitor.running" @input="updateToggle" class="toggle"/> 
      </div>
      <div class="flex-auto mx-4">
        <div class="flex">

        <h3 v-if="monitor.botName" class="text-xl font-semibold">{{ monitor.botName }}</h3>
        <h3 v-else class="text-xl font-semibold">LSB Monitor</h3>
        <h3 v-if="monitor.role" class="text-xl font-semibold ml-2 text-gray-500">{{ monitor.role }}</h3>
        </div>
        <div class="flex flex-wrap">
          <div v-for="monitorsource in monitor.monitorsources" v-bind:key="monitorsource.id">
            <MonitorSource v-bind:monitorsource="monitorsource" @deleteMonitorsource="deleteMonitorsourceButton"/>
          </div>
          <MonitorSource :add="true" @addMonitorsource="addMonitorsourceButton"/>
        </div>
      </div> 
      <div class="flex flex-col">
        <button class="w-8 h-8 bg-secondary hover:bg-primary transition duration-150 rounded-full text-white m-1" v-on:click="message()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -3 26 26" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </button>  
        <button class="w-8 h-8 bg-secondary hover:bg-primary transition duration-150 rounded-full text-white m-1" v-on:click="edit()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -3 26 26" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
        <button class="w-8 h-8 bg-secondary hover:bg-primary transition duration-150 rounded-full text-white m-1" v-on:click="del()">          
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -3 26 26" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
    <div class="error text-center text-red-500">{{ error }}</div>    
    <div v-if="showModal" class="absolute flex justify-center items-center w-screen h-screen top-0 left-0 bg-gray-100 bg-opacity-50 z-10 text-lg">
      <div class="bg-white px-8 py-4 md:w-6/12 sm:w-9/12 w-11/12 rounded border-gray-600 border-2 flex flex-col">
        <form @submit.stop.prevent="" class="flex flex-col space-y-4">
          <div class="flex flex-col">
            <label for="inputWebhook">Discord Webhook</label>
            <input type="text" id="inputWebhook" class="border-2 p-1 rounded-lg" v-model="webHook" placeholder="Discord Webhook">
          </div>
          <div class="flex flex-col">
            <label for="inputBotname">Bot Name</label>
            <input type="text" id="inputBotname" class="border-2 p-1 rounded-lg" v-model="botName" placeholder="Bot Name">
          </div>
          <div class="flex flex-col">
            <label for="inputBotimage">Bot Image</label>
            <input type="text" id="inputBotimage" class="border-2 p-1 rounded-lg" v-model="botImage" placeholder="Bot Image">
          </div>
          <div class="flex flex-col">
            <label for="inputRole">Role</label>
            <input type="text" id="inputRole" class="border-2 p-1 rounded-lg" v-model="role" placeholder="Role">
          </div>
          <div class="flex flex-row items-center justify-evenly">
            <button class="bg-primary hover:bg-secondary transition-colors duration-150 text-white rounded-full p-1 w-24 m-1 mt-4" v-on:click="saveEditMonitor">Save</button> 
            <button class="bg-primary hover:bg-secondary transition-colors duration-150 text-white rounded-full p-1 w-24 m-1 mt-4" v-on:click="cancelEditMonitor">Cancel</button>
          </div>
        </form>
        <div class="error">{{ editMonitorError }}</div>
      </div>
    </div>
    <div v-if="showModalDelete" class="absolute flex justify-center items-center w-screen h-screen top-0 left-0 bg-gray-100 bg-opacity-50 z-10 text-lg">
      <div class="bg-white px-8 py-4 rounded border-gray-600 border-2 flex flex-col md:w-4/12 sm:w-6/12 w-11/12 ">
        <div class="text-center text-xl">Do you really want to delete this monitor?</div>
        <div class="flex flex-row items-center justify-evenly">
          <button class="bg-primary hover:bg-secondary transition-colors duration-150 text-white rounded-full p-1 w-24 m-1 mt-4" v-on:click="yesDeleteMonitor()">Yes</button> 
          <button class="bg-primary hover:bg-secondary transition-colors duration-150 text-white rounded-full p-1 w-24 m-1 mt-4" v-on:click="cancelDeleteMonitor()">Cancel</button>
        </div>
      </div>
    </div>      
    <div v-if="showModalAddSource" class="absolute flex justify-center items-center w-screen h-screen top-0 left-0 bg-gray-100 bg-opacity-50 z-10 text-lg">
      <div class="bg-white px-8 py-4 rounded border-gray-600 border-2 flex flex-col">
        <div v-on:click="addSourceAll()" class="cursor-pointer hover:text-gray-600 transition-colors duration-150">All</div>
        <div v-for="monitorpage in monitorpages" :key="monitorpage.id" v-on:click="addSourcePage(monitorpage.id)" class="cursor-pointer hover:text-gray-600 transition-colors duration-150">
          {{ monitorpage.name }}        
        </div>
        <button class="bg-primary hover:bg-secondary transition-colors duration-150 text-white rounded-full p-1 px-2 m-1 mt-4" v-on:click="cancelAddSource()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import Toggle from './Toggle.vue';
import MonitorSource from './MonitorSource.vue';

@Component({
  components: {
    Toggle,
    MonitorSource
  },
  props: {
    monitor: Object
  }
})
export default class Monitor extends Vue {
  $auth;
  monitor;

  @Action sendTestmessage;
  @Action updateMonitor;
  @Action updateMonitorRunning;
  @Action deleteMonitor;
  @Action getMonitorsources;
  @Action getProducts;
  @Action getMonitorpages;
  @Action addMonitorsource;
  @Action deleteMonitorsource;
  @Getter products;
  @Getter monitorpages;

  webHook = '';
  botName = '';
  botImage = '';
  role = '';

  showModal = false;
  showModalDelete = false;
  showModalAddSource = false;

  error = '';
  editMonitorError = '';

  async mounted() {
    let accessToken = await this.$auth.strategy.token.get();
    await this.getMonitorsources({ id: this.monitor.id, accessToken  });
    await this.getMonitorpages({ accessToken });
    // await this.getProducts({ accessToken });
  }

  async message() {
    this.error = await this.sendTestmessage({ id: this.monitor.id, accessToken: await this.$auth.strategy.token.get() });
    setTimeout(() => this.error = '', 5000);
  }

  del() {
    this.showModalDelete = true;
  }

  async yesDeleteMonitor() {
    this.showModalDelete = false;
    this.error = await this.deleteMonitor({ id: this.monitor.id, accessToken: await this.$auth.strategy.token.get() });
    setTimeout(() => this.error = '', 5000);
  }

  cancelDeleteMonitor() {
    this.showModalDelete = false;
  }

  toggleValue = false;

  async updateToggle(value) {
    this.error = await this.updateMonitorRunning({ id: this.monitor.id, running: value, accessToken: await this.$auth.strategy.token.get() });
    setTimeout(() => this.error = '', 5000);
  }

  edit() {
    this.webHook = this.monitor.webHook;
    this.botName = this.monitor.botName;
    this.botImage = this.monitor.botImage;
    this.role = this.monitor.role;
    this.showModal = true;
  }

  async saveEditMonitor() {
    this.editMonitorError = await this.updateMonitor({ id: this.monitor.id, webHook: this.webHook, botName: this.botName, botImage: this.botImage, role: this.role, accessToken: await this.$auth.strategy.token.get() })
    if (this.editMonitorError == '')
      this.showModal = false;
  }

  cancelEditMonitor() {
    this.showModal = false;
  }

  addMonitorsourceButton() {
    this.showModalAddSource = true;
  }

  async addSourcePage(id: string) {
    this.showModalAddSource = false;
    this.error = await this.addMonitorsource({ id: this.monitor.id, all: false, monitorpageId: id, accessToken: await this.$auth.strategy.token.get() });
    setTimeout(() => this.error = '', 5000);
  }

  async addSourceAll() {
    this.showModalAddSource = false;
    this.error = await this.addMonitorsource({ id: this.monitor.id, all: true, accessToken: await this.$auth.strategy.token.get() });
    setTimeout(() => this.error = '', 5000);
  }

  cancelAddSource() {
    this.showModalAddSource = false;
  }

  async deleteMonitorsourceButton(monitorsource) {
    this.error = await this.deleteMonitorsource({ id: this.monitor.id, monitorsourceId: monitorsource.id, accessToken: await this.$auth.strategy.token.get() });
    setTimeout(() => this.error = '', 5000);
  }
 }
</script>