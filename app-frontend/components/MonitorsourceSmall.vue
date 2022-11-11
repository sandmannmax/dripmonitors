<template>
  <div class="bg-secondary text-white mr-1 mb-1 px-1 rounded-full">
    <span v-if="monitorsource && monitorsource.monitorpage" class="flex p-1">{{ monitorsource.monitorpage.name }}</span>
    <span v-if="monitorsource && monitorsource.product" class="flex p-1">{{ monitorsource.product.name }}</span>
    <span v-if="monitorsource && monitorsource.all" class="flex p-1">All</span>
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
export default class MonitorsourceSmall extends Vue {}
</script>