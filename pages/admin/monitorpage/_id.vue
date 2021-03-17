<template>
  <div class="container mx-auto">
    <div class="md:px-12 px-4 pb-4 flex flex-col" v-if="$auth.loggedIn && scope == 'admin' && selectedMonitorpage">
      <h1 class="md:text-3xl text-2xl font-semibold">{{ selectedMonitorpage.name }}</h1>
      <div class="text-red-500">{{ error }}</div>
      <div class="flex flex-col my-4 space-y-1">
        <span>Techname: {{ selectedMonitorpage.techname }}</span>
        <span>CC: {{ selectedMonitorpage.cc }}</span>
        <span class="flex items-center">Visible <Toggle class="ml-2" v-bind:value="selectedMonitorpage.visible" @input="updateVisibility" v-if="selectedMonitorpage.visible != undefined"/></span>
        <span class="flex items-center">isHtml <Toggle class="ml-2" v-bind:value="selectedMonitorpage.isHtml" @input="updateIsHtml" v-if="selectedMonitorpage.isHtml != undefined"/></span>
        <div class="flex items-center space-x-4">
          <span>Running</span>
          <input v-model="inputInterval" :disabled="selectedMonitorpage.running" class="border-2 border-gray-400 w-12 h-5"/>
          <div class="text-lg">{{ selectedMonitorpage.interval }}</div>
          <Toggle v-bind:value="selectedMonitorpage.running" @input="updateToggle" v-if="selectedMonitorpage.running != undefined"/>
        </div>  
      </div>
      <Urls :urls="selectedMonitorpage.urls" :monitorpageId="selectedMonitorpage.id"/>
      <!-- <Monitorpageconfig :monitorpageconfig="selectedMonitorpage.monitorpageconfig" :monitorpageId="selectedMonitorpage.id"/> -->
      <div class="mt-4 mb-2 border-2">
        <codemirror v-model="funcString" :options="cmOptions"/>
      </div>
      <div class="flex flex-col m-4">
        <button v-on:click="saveFunc()" class="bg-primary hover:bg-secondary transition duration-150 text-white py-1 mb-2 rounded">Save</button>
        <button v-on:click="testMonitorpageButton()" class="bg-primary hover:bg-secondary transition duration-150 text-white py-1 rounded">Run Test</button>
      </div>
    </div>  
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, namespace } from 'vuex-class';
import ProxiesAdmin from '../../../components/admin/Proxies.vue';
import MonitorpagesAdmin from '../../../components/admin/Monitorpages.vue';
import Urls from '../../../components/admin/Urls.vue';
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';

const userModule = namespace('userModule');
const adminModule = namespace('adminModule');

@Component({
  components: { ProxiesAdmin, MonitorpagesAdmin, Urls, codemirror }
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
  @adminModule.Action updateMonitorpageVisible;
  @adminModule.Action updateMonitorpageIsHtml;
  @adminModule.Action updateMonitorpageFunc;

  inputInterval = '';
  error = '';
  selectedMonitorpage = {id: '', func: ''};

  funcString = '';

  cmOptions = {
    // codemirror options
    tabSize: 4,
    mode: {
      ext: 'js',
      filename: 'index.js'
    },
    theme: 'base16-dark',
    lineNumbers: true,
    line: true,
  }  

  async mounted() {
    if (!this.$auth.loggedIn || this.scope != 'admin') {
      this.$router.push('/')
    } else {
      if (!this.$route.params.id)
        this.$router.push('/admin')
      else {
        for (let i = 0; i < this.monitorpages.length; i++) {
          if (this.monitorpages[i].id == this.$route.params.id) {
            this.selectedMonitorpage = this.monitorpages[i];
            this.funcString = this.selectedMonitorpage.func;
            break;
          }
        }
        if (!this.selectedMonitorpage.id)
          this.$router.push('/admin')
      }
    }
  }

  @Watch('monitorpages')
  updateSelectedMonitorpage() {
    for (let i = 0; i < this.monitorpages.length; i++) {
      if (this.monitorpages[i].id == this.$route.params.id) {
        this.selectedMonitorpage = this.monitorpages[i];
        this.funcString = this.selectedMonitorpage.func;
        break;
      }
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

  async updateVisibility(value) {
    await this.updateMonitorpageVisible({ monitorpageId: this.selectedMonitorpage.id, visible: value, auth: this.$auth });
  }  

  async updateIsHtml(value) {
    await this.updateMonitorpageIsHtml({ monitorpageId: this.selectedMonitorpage.id, isHtml: value, auth: this.$auth });    
  }  

  async saveFunc() {
    await this.updateMonitorpageFunc({ monitorpageId: this.selectedMonitorpage.id, func: this.funcString, auth: this.$auth });    
  }  

  async testMonitorpageButton() {
    let result = await this.testMonitorpage({ monitorpageId: this.selectedMonitorpage.id, func: this.funcString, auth: this.$auth });
    console.log(result)
  }
}
</script>