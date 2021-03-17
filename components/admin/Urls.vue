<template>
  <div class="flex flex-col">
    <div class="flex space-x-2 items-center">
      <h2 class="text-xl font-semibold">Urls</h2>
      <span @click="urlsOpen = !urlsOpen" class="flex items-center hover:text-gray-500 transition duration-150 transition-colors cursor-pointer">
        <svg fill="currentColor" viewBox="0 0 20 20" :class="{'rotate-180': urlsOpen, 'rotate-0': !urlsOpen}" class="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </span>
      <button class="text-white bg-secondary hover:bg-primary transition-colors duration-150 w-4 rounded-full h-4" v-on:click="showAddUrlModal">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    <div class="h-0 overflow-hidden" :class="{'h-auto': urlsOpen}">
      <div class="p-2">
        <Urlelement v-for="url in urls" :key="url.id" :url="url" :monitorpageId="monitorpageId"/>
        <div v-if="!urls || urls.length == 0">No Urls</div>
      </div>
    </div>
    <div v-if="showModalAddUrl" class="absolute flex justify-center items-center w-screen h-screen top-0 left-0 bg-gray-100 bg-opacity-50 z-10 text-lg">
      <div class="bg-white px-8 py-4 rounded border-gray-600 border-2 flex flex-col md:w-4/12 sm:w-6/12 w-11/12 ">
        <input type="text" v-model="addUrlString" class="border-2"/>
        <div class="flex flex-row items-center justify-evenly">
          <button class="bg-primary hover:bg-secondary transition-colors duration-150 text-white rounded-full p-1 w-24 m-1 mt-4" v-on:click="addAddUrlModal()">Add</button> 
          <button class="bg-primary hover:bg-secondary transition-colors duration-150 text-white rounded-full p-1 w-24 m-1 mt-4" v-on:click="cancelAddUrlModal()">Cancel</button>
        </div>
      </div>
    </div> 
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Urlelement from './Url.vue';
import { namespace } from 'vuex-class';

const adminModule = namespace('adminModule');

@Component({
  components: { Urlelement },
  props: {
    urls: Array,
    monitorpageId: String
  }
})
export default class Urls extends Vue {
  $auth;
  monitorpageId;
  urlsOpen = false;
  showModalAddUrl = false;
  addUrlString = '';

  @adminModule.Action createUrl;  

  showAddUrlModal() {
    this.showModalAddUrl = true;
    this.addUrlString = '';
  }

  addAddUrlModal() {
    this.showModalAddUrl = false;
    this.createUrl({ monitorpageId: this.monitorpageId, url: this.addUrlString, auth: this.$auth })
  }

  cancelAddUrlModal() {
    this.showModalAddUrl = false;
  }
}
</script>