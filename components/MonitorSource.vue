<template>
  <div class="bg-secondary text-white mr-1 mb-1 px-1 rounded-full">
    <span v-if="monitorsource && monitorsource.monitorpage" class="flex p-1">
      {{ monitorsource.monitorpage.name }} 
      <span v-on:click="deleteMonitorsource()" class="flex w-5 ml-1 items-center hover:text-gray-600 transition duration-150 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>
    </span>
    <span v-if="monitorsource && monitorsource.product" class="flex p-1">
      {{ monitorsource.product.name }}
      <span v-on:click="deleteMonitorsource()" class="flex w-5 ml-1 items-center hover:text-gray-600 transition duration-150 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>
    </span>
    <span v-if="monitorsource && monitorsource.all" class="flex p-1">
      All
      <span v-on:click="deleteMonitorsource()" class="flex w-5 ml-1 items-center hover:text-gray-600 transition duration-150 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>
    </span>
    <span v-if="add" class="flex p-1">
      Add
      <span v-on:click="addMonitorsource()" class="flex w-5 ml-1 items-center hover:text-gray-600 transition duration-150 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>
    </span>    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    monitorsource: {
      type: Object
    },
    add: {
      type: Boolean,
      default: false
    }
  }
})
export default class Monitorsource extends Vue {
  monitorsource;

  addMonitorsource() {
    this.$emit('addMonitorsource');
  }

  deleteMonitorsource() {
    this.$emit('deleteMonitorsource', this.monitorsource);
  }
}
</script>