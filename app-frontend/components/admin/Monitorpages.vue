<template>
  <div>
    <div class="flex flex-row items-center space-x-3">
      <h2 class="text-2xl">Monitorpages</h2>
      <button class="text-white bg-secondary hover:bg-primary transition-colors duration-150 w-6 rounded-full h-6" v-on:click="addMonitorpageButton()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>  
    <div class="border-2 border-gray-200 p-2 space-y-2">
      <Monitorpage v-for="monitorpage in monitorpages" v-bind:key="monitorpage.id" v-bind:monitorpage="monitorpage"/>
    </div>
    <div v-if="showModalAddMonitorpage" class="fixed flex justify-center items-center w-screen h-screen top-0 left-0 bg-gray-100 bg-opacity-50 z-10 text-lg">
      <div class="bg-white px-8 py-4 md:w-6/12 sm:w-9/12 w-11/12 rounded border-gray-600 border-2 flex flex-col">
        <form @submit.stop.prevent="" class="flex flex-col space-y-4">
          <div class="flex flex-col">
            <label for="inputName">Name</label>
            <input type="text" id="inputName" class="border-2 p-1 rounded-lg" v-model="monitorpageName" placeholder="Name">
          </div>
          <div class="flex flex-col">
            <label for="inputFunctionname">Functionname</label>
            <input type="text" id="inputFunctionname" class="border-2 p-1 rounded-lg" v-model="monitorpageFunctionname" placeholder="Functionname">
          </div>
          <div class="flex flex-col">
            <label for="inputCC">CC</label>
            <input type="text" id="inputCC" class="border-2 p-1 rounded-lg" v-model="monitorpageCC" placeholder="CC">
          </div>
          <div class="flex flex-row items-center justify-evenly">
            <button class="bg-primary hover:bg-secondary transition-colors duration-150 text-white rounded-lg p-1 w-24 m-1 mt-4" v-on:click="saveAddMonitorpage">Save</button> 
            <button class="bg-primary hover:bg-secondary transition-colors duration-150 text-white rounded-lg p-1 px-2 m-1 mt-4" v-on:click="cancelAddMonitorpage">Cancel</button>
          </div>
        </form>
        <div class="text-center text-red-500 sm:text-lg text-sm mt-2">{{ addMonitorpageError }}</div>          
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Monitorpage from './Monitorpage.vue';

const adminModule = namespace('adminModule');

@Component({
  components: {
    Monitorpage
  }
})
export default class Monitorpages extends Vue {
  $auth;

  @adminModule.Getter monitorpages;
  @adminModule.Action getMonitorpages;
  @adminModule.Action addMonitorpage;

  monitorpageName = '';
  monitorpageFunctionname = '';
  monitorpageCC = '';

  addMonitorpageError = ''

  showModalAddMonitorpage = false;

  async mounted() {  
    await this.getMonitorpages({ auth: this.$auth });
  }

  addMonitorpageButton() {
    this.monitorpageName = '';
    this.monitorpageFunctionname = '';
    this.monitorpageCC = '';
    this.addMonitorpageError = ''
    this.showModalAddMonitorpage = true;
  }

  async saveAddMonitorpage() {
    if (!this.monitorpageName) {
      this.addMonitorpageError = 'Name can\'t be empty';
      return;
    }
    if (!this.monitorpageFunctionname) {
      this.addMonitorpageError = 'Functionname can\'t be empty';
      return;
    }
    if (!this.monitorpageCC) {
      this.addMonitorpageError = 'CC can\'t be empty';
      return;
    }

    this.addMonitorpageError = await this.addMonitorpage({ name: this.monitorpageName, functionName: this.monitorpageFunctionname, cc: this.monitorpageCC, auth: this.$auth });

    if (!this.addMonitorpageError)
      this.showModalAddMonitorpage = false;
  }

  cancelAddMonitorpage() {
    this.showModalAddMonitorpage = false;
  }
}
</script>
