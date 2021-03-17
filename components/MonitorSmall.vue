<template>
  <div class="flex items-center space-x-4">
    <img v-bind:src="monitor.botImage" class="rounded-full w-16" v-if="monitor.botImage"/>
    <img src="logoWide.png" class="rounded-full w-16" v-else/>

    <h3 v-if="monitor.botName" class="text-xl font-semibold">{{ monitor.botName }}</h3>
    <h3 v-else class="text-xl font-semibold">LSB Monitor</h3>
  </div> 
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    monitor: Object
  }
})
export default class MonitorSmall extends Vue { }
</script>