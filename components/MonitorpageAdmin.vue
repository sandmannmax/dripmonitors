<template>
  <div class="flex py-2 items-center space-x-4">
    <h3 class="text-lg">{{ monitorpageAdmin.name }}</h3>
    <input v-model="inputInterval" :disabled="monitorpageAdmin.running" class="border-2 border-gray-400 w-16"/>
    <div class="text-lg">{{ monitorpageAdmin.interval }}</div>
    <Toggle v-bind:value="monitorpageAdmin.running" @input="updateToggle"/>
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
    monitorpageAdmin: Object
  }
})
export default class MonitorpageAdmin extends Vue {
  $auth;

  @Action createJobAdmin;
  @Action deleteJobAdmin;

  monitorpageAdmin;

  inputInterval = "";

  async updateToggle(value) {

    if (value) {
      let intervalNumber = Number.parseInt(this.inputInterval);

      if (Number.isNaN(intervalNumber)) {
        return;
      }

      await this.createJobAdmin({ monitorpageId: this.monitorpageAdmin.id, interval: intervalNumber, accessToken: this.$auth.strategy.token.get() })
    } else {
      await this.deleteJobAdmin({ monitorpageId: this.monitorpageAdmin.id, accessToken: this.$auth.strategy.token.get() });
    }
  }
}
</script>
