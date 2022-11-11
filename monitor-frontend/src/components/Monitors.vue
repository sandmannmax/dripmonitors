<template>
  <div class="monitors-component">
    <h3>Monitors</h3>
    <div class="monitor-list">
      <Monitor v-for="monitor in monitors" v-bind:key="monitor.monitor._id" v-bind:monitor="monitor" class="monitor"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import Monitor from './Monitor.vue';

@Component({
  components: {
    Monitor
  }
})
export default class Monitors extends Vue {
  @Getter user;
  @Getter monitors;
  @Action getMonitors;

  async mounted() {
    if (this.user)      
      await this.getMonitors({ accessToken: this.user.accessToken, refreshToken: this.user.refreshToken });
  }
}
</script>

<style scoped>
  .monitors-component {
    margin: 10px;
    padding: 10px;
    border: 1px solid #eee;
  }

  .monitor {
    margin-bottom: 5px;
  }
</style>
