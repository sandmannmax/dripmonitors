<template>
  <div class="flex flex-col mt-8">
    <h3 class="text-2xl font-semibold">Urls</h3>
    <div class="flex flex-col sm:mx-8 mx-2">
      <Urlelement v-for="url in urls" :key="url.id" :url="url" :monitorpageId="monitorpageId"/>
      <div v-if="!urls || urls.length == 0">No Urls</div>
      <div class="flex justify-center">
        <button class="bg-secondary hover:bg-gray-700 transition-colors duration-150 text-white rounded-lg p-1 w-24 m-1 mt-4" v-on:click="showAddUrlModal">Add</button>
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