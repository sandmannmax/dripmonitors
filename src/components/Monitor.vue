<template>
  <div class="monitor-component">
    <h5>{{ monitor.monitor.page }}</h5>
    <input v-model="inputInterval" :disabled="inputIntervalDisabled"/>
    <div v-if="monitor.job">{{ monitor.job.interval }}</div>
    <Toggle v-bind:value="toggleValue" @input="updateToggle"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import Toggle from './Toggle.vue';

@Component({
  components: {
    Toggle
  },
  props: {
    monitor: Object
  }
})
export default class Monitor extends Vue {
  @Getter user;
  @Action createJob;
  @Action deleteJob;

  monitor;

  toggleValue = false;

  mounted() {
    this.toggleValue = this.monitor.job != undefined;
    this.inputIntervalDisabled = this.monitor.job != undefined;
  }

  inputInterval = "";
  inputIntervalDisabled = true;

  async updateToggle(value) {
    this.toggleValue = value;

    if (this.toggleValue) {
      let intervalNumber = Number.parseInt(this.inputInterval);

      if (Number.isNaN(intervalNumber)) {
        this.toggleValue = false;
        return;
      }

      await this.createJob({ monitorId: this.monitor.monitor._id, interval: intervalNumber, accessToken: this.user.accessToken, refreshToken: this.user.refreshToken })
      this.inputIntervalDisabled = true;
    } else {
      await this.deleteJob({ monitorId: this.monitor.monitor._id, accessToken: this.user.accessToken, refreshToken: this.user.refreshToken });
      this.inputIntervalDisabled = false;
    }

  }
}
</script>

<style scoped>
  .monitor-component {
    border: 1px solid white;
    padding: 10px;
    display: flex;
    vertical-align: middle;
  }
  
  .monitor-component h5 {
    margin: 0 10px 0 0;
  }
  
  .monitor-component input {
    margin: 0 10px 0 0;
  }

  input {
    height: 20px;
    width: 50px;
  }

</style>
