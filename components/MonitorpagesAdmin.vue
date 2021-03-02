<template>
  <div>
    <h2 class="text-2xl">Monitorpages</h2>
    <div class="border-2 border-gray-200 p-2 space-y-2">
      <MonitorpageAdmin v-for="monitorpageAdmin in monitorpagesAdmin" v-bind:key="monitorpageAdmin.id" v-bind:monitorpageAdmin="monitorpageAdmin"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import MonitorpageAdmin from './MonitorpageAdmin.vue';

@Component({
  components: {
    MonitorpageAdmin
  }
})
export default class MonitorpagesAdmin extends Vue {
  $auth;

  @Getter monitorpagesAdmin;
  @Action getMonitorpagesAdmin;

  async mounted() {  
    await this.getMonitorpagesAdmin({ accessToken: this.$auth.strategy.token.get() });
  }
}
</script>
