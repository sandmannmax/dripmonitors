<template>
  <div class="flex flex-row justify-between text-secondary mb-1" v-if="monitorsource">
    <span v-if="monitorsource.monitorpage">
      {{ monitorsource.monitorpage.name }}      
    </span>
    <span v-if="monitorsource.product">
      {{ monitorsource.product.name }}
    </span>
    <span v-if="monitorsource.all">
      All
    </span>   
    <span v-on:click="deleteMonitorsource()" class="flex w-6 ml-1 items-center hover:text-gray-600 transition duration-150 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    monitorsource: {
      type: Object
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