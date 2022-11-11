<template>
  <div class="flex py-2 items-center space-x-4">
    <h3 class="text-lg">{{ monitorpage.name }}</h3>
    <input v-model="inputInterval" :disabled="monitorpage.running" class="border-2 border-gray-400 w-16"/>
    <div class="text-lg">{{ monitorpage.interval }}</div>
    <Toggle v-bind:value="monitorpage.running" @input="updateToggle" v-if="monitorpage.running != undefined"/>
    <button class="w-6 h-6 bg-secondary hover:bg-primary transition duration-150 rounded-full text-white m-1 ml-auto" v-on:click="edit">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -3 26 26" fill="currentColor">
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Toggle from '../Toggle.vue';

const adminModule = namespace('adminModule');

@Component({
  components: {
    Toggle
  },
  props: {
    monitorpage: Object
  }
})
export default class Monitorpage extends Vue {
  $auth;
  $router;

  @adminModule.Action startMonitorpage;
  @adminModule.Action stopMonitorpage;

  monitorpage;

  inputInterval = "";

  async updateToggle(value) {

    if (value) {
      let intervalNumber = Number.parseInt(this.inputInterval);

      if (Number.isNaN(intervalNumber)) {
        return;
      }

      await this.startMonitorpage({ monitorpageId: this.monitorpage.id, interval: intervalNumber, auth: this.$auth })
    } else {
      await this.stopMonitorpage({ monitorpageId: this.monitorpage.id, auth: this.$auth });
    }
  }

  edit() {
    this.$router.push('/admin/monitorpage/' + this.monitorpage.id);
  }
}
</script>
