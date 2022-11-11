<template>
  <div class="container mx-auto">
    <div class="md:px-12 px-4 pb-4 flex flex-col" v-if="$auth.loggedIn && scope == 'admin' && selectedMonitorpage">
      <h1 class="md:text-3xl text-2xl font-semibold mx-auto">{{ selectedMonitorpage.name }}</h1>
      <div class="text-red-500 text-center">{{ error }}</div>
      <div class="mt-8">
        <h3 class="text-2xl font-semibold">General</h3>
        <div class="flex flex-col sm:mx-8 mx-2">
          <label for="inputName">Name</label>
          <input type="text" id="inputName" class="border-2 p-1 rounded-lg" v-model="name" placeholder="Name">

          <label for="inputCC">CC</label>
          <input type="text" id="inputCC" class="border-2 p-1 rounded-lg" v-model="cc" placeholder="CC">  

          <label for="inputFunctionname">Functionname</label>
          <input type="text" id="inputFunctionname" class="border-2 p-1 rounded-lg" v-model="functionName" placeholder="Functionname">

          <label for="toggleVisible">Visible</label>
          <Toggle id="toggleVisible" v-bind:value="visible" @input="updateVisible" class="toggle"/>

          <label for="toggleIsHtml">IsHtml</label>
          <Toggle id="toggleIsHtml" v-bind:value="isHtml" @input="updateIsHtml" class="toggle"/>

                   

          <div class="flex justify-center">
            <button class="bg-green-500 hover:bg-green-600 transition-colors duration-150 text-white rounded-lg p-1 w-24 m-1 mt-4" v-on:click="saveGeneralButton">Save</button>
            <button class="bg-secondary hover:bg-gray-700 transition-colors duration-150 text-white rounded-lg p-1 w-24 m-1 mt-4" v-on:click="testMonitorpageButton">Test</button>
          </div>
        </div>
      </div>
      <div class="mt-8">
        <h3 class="text-2xl font-semibold">Running</h3>
        <div class="flex justify-center space-x-4 sm:mx-8 mx-2">
          <input v-model="interval" :disabled="running" class="border-2 border-gray-400 w-12 h-5"/>
          <Toggle id="toggleRunning" v-bind:value="running" @input="updateRunning" class="toggle"/>
        </div>
      </div>
      <Urls :urls="selectedMonitorpage.urls" :monitorpageId="selectedMonitorpage.id"/>
      <Products :products="selectedMonitorpage.products" :monitorpageId="selectedMonitorpage.id"/>
    </div>
    <div v-if="showModalTest" class="fixed flex justify-center items-center w-screen h-screen top-0 left-0 bg-gray-100 bg-opacity-50 z-10 text-lg">
        <div class="bg-white px-8 py-4 rounded border-gray-600 border-2 flex flex-col md:w-4/12 sm:w-6/12 w-11/12 ">
          <div class="flex flex-row items-center justify-evenly">
            <button class="bg-primary hover:bg-secondary transition-colors duration-150 text-white rounded-lg p-1 w-24 m-1 mt-4" v-on:click="testWithReload()">Reload</button> 
            <button class="bg-primary hover:bg-secondary transition-colors duration-150 text-white rounded-lg p-1 w-24 m-1 mt-4" v-on:click="testWithSaved()">Saved</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import ProxiesAdmin from '../../../components/admin/Proxies.vue';
import MonitorpagesAdmin from '../../../components/admin/Monitorpages.vue';
import Urls from '../../../components/admin/Urls.vue';
import Url from '../../../components/admin/Url.vue';
import Products from '../../../components/admin/Products.vue';

const userModule = namespace('userModule');
const adminModule = namespace('adminModule');

@Component({
  components: { ProxiesAdmin, MonitorpagesAdmin, Urls, Url, Products }
})
export default class Monitorpage extends Vue {
  $auth;
  $router;
  $route;
  
  @userModule.Getter scope;
  @adminModule.Getter monitorpages;
  @adminModule.Action startMonitorpage;
  @adminModule.Action stopMonitorpage;
  @adminModule.Action testMonitorpage;
  @adminModule.Action updateMonitorpage;
  @adminModule.Action getProducts;

  name = '';
  cc = '';
  functionName = '';
  visible = false;
  isHtml = false;
  running = false;
  interval = '';

  showModalTest = false;

  inputInterval = '';
  error = '';
  selectedMonitorpage = { id: '', name: '', cc: '', functionName: '', visible: false, isHtml: false, running: false, interval: 0 }; 

  async mounted() {
    if (!this.$auth.loggedIn || this.scope != 'admin') {
      this.$router.push('/')
    } else {
      if (!this.$route.params.id)
        this.$router.push('/admin')
      else {
        await this.getProducts({ monitorpageId: this.$route.params.id, auth: this.$auth });
        this.updateSelectedMonitorpage();
      }
    }
  }

  @Watch('monitorpages')
  updateSelectedMonitorpage() {
    for (let i = 0; i < this.monitorpages.length; i++) {
      if (this.monitorpages[i].id == this.$route.params.id) {
        this.selectedMonitorpage = this.monitorpages[i];
        if (this.selectedMonitorpage.id) {
          this.name = this.selectedMonitorpage.name;
          this.cc = this.selectedMonitorpage.cc;
          this.functionName = this.selectedMonitorpage.functionName;
          this.visible = this.selectedMonitorpage.visible;
          this.isHtml = this.selectedMonitorpage.isHtml;
          this.running = this.selectedMonitorpage.running;
          this.interval = this.selectedMonitorpage.interval.toString();
        } else 
          this.$router.push('/admin')
        break;
      }
    }
  }

  async saveGeneralButton() {
    this.error = await this.updateMonitorpage({ monitorpageId: this.selectedMonitorpage.id, name: this.name, cc: this.cc, functionName: this.functionName, visible: this.visible, isHtml: this.isHtml, auth: this.$auth });
    if (this.error)
      setTimeout(() => this.error = '', 8000);
  }

  updateVisible(value) {
    this.visible = value;
  }

  updateIsHtml(value) {
    this.isHtml = value;
  }

  async updateRunning(value) {
    if (value) {
      let intervalNumber = Number.parseInt(this.interval);
      if (Number.isNaN(intervalNumber)) {
        return;
      }
      await this.startMonitorpage({ monitorpageId: this.selectedMonitorpage.id, interval: intervalNumber, auth: this.$auth })
    } else {
      await this.stopMonitorpage({ monitorpageId: this.selectedMonitorpage.id, auth: this.$auth });
    }
  }

  async updateToggle(value) {

    if (value) {
      let intervalNumber = Number.parseInt(this.inputInterval);

      if (Number.isNaN(intervalNumber)) {
        return;
      }

      await this.startMonitorpage({ monitorpageId: this.selectedMonitorpage.id, interval: intervalNumber, auth: this.$auth })
    } else {
      await this.stopMonitorpage({ monitorpageId: this.selectedMonitorpage.id, auth: this.$auth });
    }
  }

  async testMonitorpageButton() {
    this.showModalTest = true;
  }

  async testWithReload() {
    this.showModalTest = false;
    this.error = await this.testMonitorpage({ monitorpageId: this.selectedMonitorpage.id, reload: true, auth: this.$auth });
    if (this.error)
      setTimeout(() => this.error = '', 8000);
  }

  async testWithSaved() {
    this.showModalTest = false;
    this.error = await this.testMonitorpage({ monitorpageId: this.selectedMonitorpage.id, reload: false, auth: this.$auth });
    if (this.error)
      setTimeout(() => this.error = '', 8000);
  }
}
</script>