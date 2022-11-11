<template>
  <div class="flex flex-row justify-between text-secondary mb-1 items-center" v-if="url">
    <span class="truncate">{{ url.url }}</span>
    <div class="flex flex-row">
      <button class="w-6 h-6 bg-secondary hover:bg-primary transition duration-150 rounded-full text-white m-1" v-on:click="edit()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -3 26 26" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>
      <button class="w-6 h-6 bg-secondary hover:bg-primary transition duration-150 rounded-full text-white m-1" v-on:click="del()">          
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -3 26 26" fill="currentColor">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    <div v-if="showModalEditUrl" class="absolute flex justify-center items-center w-screen h-screen top-0 left-0 bg-gray-100 bg-opacity-50 z-10 text-lg">
      <div class="bg-white px-8 py-4 rounded border-gray-600 border-2 flex flex-col md:w-4/12 sm:w-6/12 w-11/12 ">
        <input type="text" v-model="editUrlString" class="border-2"/>
        <div class="flex flex-row items-center justify-evenly">
          <button class="bg-primary hover:bg-secondary transition-colors duration-150 text-white rounded-full p-1 w-24 m-1 mt-4" v-on:click="saveEditUrlModal()">Save</button> 
          <button class="bg-primary hover:bg-secondary transition-colors duration-150 text-white rounded-full p-1 w-24 m-1 mt-4" v-on:click="cancelEditUrlModal()">Cancel</button>
        </div>
      </div>
    </div> 
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const adminModule = namespace('adminModule');

@Component({
  props: {
    url: Object,
    monitorpageId: String
  }
})
export default class Url extends Vue {
  $auth;
  url;
  monitorpageId;

  @adminModule.Action updateUrl;
  @adminModule.Action deleteUrl;

  editUrlString = '';
  showModalEditUrl = false;

  edit() {
    this.editUrlString = this.url.url;
    this.showModalEditUrl = true;
  }

  saveEditUrlModal() {
    this.showModalEditUrl = false;
    this.updateUrl({ monitorpageId: this.monitorpageId, urlId: this.url.id, url: this.editUrlString, auth: this.$auth });
  }

  cancelEditUrlModal() {
    this.showModalEditUrl = false;
  }

  del() {
    this.deleteUrl({ monitorpageId: this.monitorpageId, urlId: this.url.id, auth: this.$auth })
  }
}
</script>