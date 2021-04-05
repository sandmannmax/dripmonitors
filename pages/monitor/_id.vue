<template>
  <div class="container mx-auto">
    <div class="md:px-12 px-4 pb-4 flex flex-col">
      <div class="flex flex-row items-center justify-center space-x-4">
        <img v-bind:src="selectedMonitor.botImage" class="rounded-full w-24" v-if="selectedMonitor && selectedMonitor.botImage"/>
        <img src="/logoWide.png" class="rounded-full w-24" v-else/>

        <h2 v-if="selectedMonitor.botName" class="text-2xl font-semibold">{{ selectedMonitor.botName }}</h2>
        <h2 v-else class="text-xl font-semibold">LSB Monitor</h2>
      </div>
      <div class="text-center text-red-500">{{ error }}</div>
      <div class="mt-8">
        <h3 class="text-2xl font-semibold">General</h3>
        <div class="flex flex-col sm:mx-8 mx-2">          
          <label for="inputBotname">Bot Name</label>
          <input type="text" id="inputBotname" class="border-2 p-1 rounded-lg" v-model="botName" placeholder="Bot Name">  
          
          <label for="inputBotimage">Bot Image</label>
          <input type="text" id="inputBotimage" class="border-2 p-1 rounded-lg" v-model="botImage" placeholder="Bot Image">

          <label for="inputWebhook">Discord Webhook</label>
          <div class="flex sm:flex-row flex-col sm:items-center">
            <input type="text" id="inputWebhook" class="border-2 p-1 rounded-lg flex-grow sm:mr-4" v-model="webHook" placeholder="Discord Webhook">
            <button class="bg-secondary hover:bg-gray-700 transition-colors duration-150 text-white rounded-lg p-1 w-48 mx-auto sm:mt-0 mt-2" v-on:click="sendTestmessageButton">Send Testmessage</button>
          </div>

          <label for="toggleRunning">Running</label>
          <Toggle id="toggleRunning" v-bind:value="running" @input="updateToggle" class="toggle"/>

          <div class="flex justify-center">
            <button class="bg-green-500 hover:bg-green-600 transition-colors duration-150 text-white rounded-lg p-1 w-24 m-1 mt-4" v-on:click="saveGeneralButton">Save</button>
          </div>
        </div>
      </div>
      <div class="mt-8">
        <h3 class="text-2xl font-semibold">Sources</h3>
        <div class="flex flex-col sm:mx-8 mx-2">
          <Monitorsource v-for="monitorsource in selectedMonitor.monitorsources" v-bind:key="monitorsource.id" v-bind:monitorsource="monitorsource" @deleteMonitorsource="deleteMonitorsourceButton"/>
          <div class="flex justify-center">
            <button class="bg-secondary hover:bg-gray-700 transition-colors duration-150 text-white rounded-lg p-1 w-24 m-1 mt-4" v-on:click="addMonitorsourceButton">Add</button>
          </div>
        </div>
      </div>
      <div class="mt-8">
        <h3 class="text-2xl font-semibold">Roles</h3>
        <div class="flex flex-col sm:mx-8 mx-2">
          <Role v-for="role in selectedMonitor.roles" v-bind:key="role.id" v-bind:role="role" @deleteRole="deleteRoleButton"/>
          <div class="flex justify-center">
            <button class="bg-secondary hover:bg-gray-700 transition-colors duration-150 text-white rounded-lg p-1 w-24 m-1 mt-4" v-on:click="addRoleButton">Add</button>
          </div>
        </div>
      </div>
      <div class="border-2 border-red-600 my-8 p-4 flex justify-between items-center rounded-lg">
        <span class="text-lg">Delete Monitor</span>
        <button class="bg-primary hover:bg-red-700 text-white m-1 p-2 transition duration-150 rounded-lg" v-on:click="del()">          
          DELETE
        </button>
      </div>
      <div v-if="showModalDelete" class="fixed flex justify-center items-center w-screen h-screen top-0 left-0 bg-gray-100 bg-opacity-50 z-10 text-lg">
        <div class="bg-white px-8 py-4 rounded border-gray-600 border-2 flex flex-col md:w-4/12 sm:w-6/12 w-11/12 ">
          <div class="text-center text-xl">Do you really want to delete this monitor?</div>
          <div class="flex flex-row items-center justify-evenly">
            <button class="bg-primary hover:bg-secondary transition-colors duration-150 text-white rounded-lg p-1 w-24 m-1 mt-4" v-on:click="yesDeleteMonitor()">Yes</button> 
            <button class="bg-primary hover:bg-secondary transition-colors duration-150 text-white rounded-lg p-1 w-24 m-1 mt-4" v-on:click="cancelDeleteMonitor()">Cancel</button>
          </div>
        </div>
      </div>
      <div v-if="showModalAddSource" class="fixed flex justify-center items-center w-screen h-screen top-0 left-0 bg-gray-100 bg-opacity-50 z-10 text-lg">
        <div class="bg-white px-8 py-4 rounded border-gray-600 border-2 flex flex-col">
          <div v-on:click="addSourceAll()" class="cursor-pointer hover:text-gray-600 transition-colors duration-150">All</div>
          <div v-for="monitorpage in monitorpages" :key="monitorpage.id" v-on:click="addSourcePage(monitorpage.id)" class="cursor-pointer hover:text-gray-600 transition-colors duration-150">
            {{ monitorpage.name }}        
          </div>
          <button class="bg-primary hover:bg-secondary transition-colors duration-150 text-white rounded-lg p-1 px-2 m-1 mt-4" v-on:click="cancelAddSource()">Cancel</button>
        </div>
      </div>
      <div v-if="showModalAddRole" class="fixed flex justify-center items-center w-screen h-screen top-0 left-0 bg-gray-100 bg-opacity-50 z-10 text-lg">
        <div class="bg-white px-8 py-4 md:w-6/12 sm:w-9/12 w-11/12 rounded border-gray-600 border-2 flex flex-col">
          <form @submit.stop.prevent="" class="flex flex-col space-y-4">
          <div class="flex flex-col">
            <label for="inputRoleName">Role Name</label>
            <input type="text" id="inputRoleName" class="border-2 p-1 rounded-lg" v-model="roleName" placeholder="Role Name">
          </div>
          <div class="flex flex-col">
            <label for="inputRoleId">Discord Role ID</label>
            <input type="text" id="inputRoleId" class="border-2 p-1 rounded-lg" v-model="roleId" placeholder="Discord Role ID">
          </div>
          <div class="flex flex-row items-center justify-evenly">
            <button class="bg-primary hover:bg-secondary transition-colors duration-150 text-white rounded-lg p-1 w-24 m-1 mt-4" v-on:click="saveAddRole">Save</button> 
            <button class="bg-primary hover:bg-secondary transition-colors duration-150 text-white rounded-lg p-1 px-2 m-1 mt-4" v-on:click="cancelAddRole">Cancel</button>
          </div>
        </form>
        <div class="text-center text-red-500 sm:text-lg text-sm mt-2">{{ addRoleError }}</div>          
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, namespace } from 'vuex-class';
import Toggle from '../../components/Toggle.vue';
import Monitorsource from '../../components/MonitorSource.vue';

const monitorModule = namespace('monitorModule');

@Component({
  components: {
    Toggle,
    Monitorsource
  }
})
export default class Monitor extends Vue {
  $auth;
  $router;
  $route;

  @monitorModule.Getter monitors;
  @monitorModule.Action getMonitors;
  @monitorModule.Action sendTestmessage;
  @monitorModule.Action updateMonitor;
  @monitorModule.Action updateMonitorRunning;
  @monitorModule.Action deleteMonitor;
  @monitorModule.Action addMonitorsource;
  @monitorModule.Action deleteMonitorsource;
  @monitorModule.Action addRole;
  @monitorModule.Action deleteRole;
  @Action getProducts;
  @Action getMonitorpages;
  @Getter products;
  @Getter monitorpages;

  selectedMonitor = { id: '', webHook: '', botName: '', botImage: '', running: false };

  webHook = '';
  botName = '';
  botImage = '';
  running = false;

  roleName = '';
  roleId = '';

  showModal = false;
  showModalDelete = false;
  showModalAddSource = false;
  showModalAddRole = false;

  error = '';
  addRoleError = '';

  async mounted() {
    if (!this.monitors)
      this.error = await this.getMonitors({ auth: this.$auth });
    await this.getMonitorpages({ auth: this.$auth });
    // await this.getProducts({ auth: this.$auth });
    if (this.monitors) {
      this.updateSelectedMonitor();
      if (!this.selectedMonitor.id)
        this.$router.push('/monitor')
    } else {
      this.$router.push('/monitor')
    }
  }

  async sendTestmessageButton() {
    this.error = await this.sendTestmessage({ id: this.selectedMonitor.id, auth: this.$auth });
    if (this.error)
      setTimeout(() => this.error = '', 8000);
  }

  updateToggle(value) {
    this.running = value;    
  }

  async saveGeneralButton() {
    let savedRunning = this.running;

    this.error = await this.updateMonitor({ id: this.selectedMonitor.id, webHook: this.webHook, botName: this.botName, botImage: this.botImage, auth: this.$auth });
    if (this.error) {
      setTimeout(() => this.error = '', 8000);
      return;
    }

    this.error = await this.updateMonitorRunning({ id: this.selectedMonitor.id, running: savedRunning, auth: this.$auth });
    if (this.error)
      setTimeout(() => this.error = '', 8000);
  }  

  del() {
    this.showModalDelete = true;
  }

  async yesDeleteMonitor() {
    this.showModalDelete = false;
    this.error = await this.deleteMonitor({ id: this.selectedMonitor.id, auth: this.$auth });
    if (this.error)
      setTimeout(() => this.error = '', 5000);
    else
      this.$router.push('/monitor')
  }

  cancelDeleteMonitor() {
    this.showModalDelete = false;
  }

  addMonitorsourceButton() {
    this.showModalAddSource = true;
  }

  async addSourcePage(id: string) {
    this.showModalAddSource = false;
    this.error = await this.addMonitorsource({ id: this.selectedMonitor.id, all: false, monitorpageId: id, auth: this.$auth });
    setTimeout(() => this.error = '', 5000);
  }

  async addSourceAll() {
    this.showModalAddSource = false;
    this.error = await this.addMonitorsource({ id: this.selectedMonitor.id, all: true, auth: this.$auth });
    if (this.error)
      setTimeout(() => this.error = '', 5000);
  }

  cancelAddSource() {
    this.showModalAddSource = false;
  }

  async deleteMonitorsourceButton(monitorsource) {
    this.error = await this.deleteMonitorsource({ id: this.selectedMonitor.id, monitorsourceId: monitorsource.id, auth: this.$auth });
    if (this.error)
      setTimeout(() => this.error = '', 5000);
  }

  addRoleButton() {
    this.addRoleError = '';
    this.roleName = '';
    this.roleId = '';
    this.showModalAddRole = true;
  }

  async saveAddRole() {
    this.addRoleError = '';

    if (!this.roleName) {
      this.addRoleError = 'Role Name cant\'t be empty';
      return;
    }
    if (!this.roleId) {
      this.addRoleError = 'Discord Role ID cant\'t be empty';
      return;
    }

    this.addRoleError = await this.addRole({ id: this.selectedMonitor.id, name: this.roleName, roleId: this.roleId, auth: this.$auth });

    if (!this.addRoleError)
      this.showModalAddRole = false;
  }

  cancelAddRole() {
    this.showModalAddRole = false;
  }

  async deleteRoleButton(role) {
    this.error = await this.deleteRole({ id: this.selectedMonitor.id, rid: role.id, auth: this.$auth });
    if (this.error)
      setTimeout(() => this.error = '', 5000);
  }

  @Watch('monitors')
  updateSelectedMonitor() {
    for (let i = 0; i < this.monitors.length; i++) {
      if (this.monitors[i].id == this.$route.params.id) {
        this.selectedMonitor = this.monitors[i];
        this.botName = this.selectedMonitor.botName;
        this.botImage = this.selectedMonitor.botImage;
        this.webHook = this.selectedMonitor.webHook;
        this.running = this.selectedMonitor.running;
        break;
      }
    }
  }
 }
</script>