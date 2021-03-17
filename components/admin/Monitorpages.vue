<template>
  <div>
    <h2 class="text-2xl">Monitorpages</h2>
    <div class="border-2 border-gray-200 p-2 space-y-2">
      <Monitorpage v-for="monitorpage in monitorpages" v-bind:key="monitorpage.id" v-bind:monitorpage="monitorpage"/>
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

  async mounted() {  
    await this.getMonitorpages({ auth: this.$auth });
  }
}
</script>
