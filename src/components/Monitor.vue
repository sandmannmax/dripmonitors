<template>
  <div class="view">
    <div class="content">
      <div class="column">        
        <b-img v-bind:src="monitor.botImage" class="botImage" v-if="monitor.botImage"/>
        <b-img src="logoWide.png" class="botImage" v-else/>
        <Toggle v-bind:value="monitor.running" @input="updateToggle" class="toggle"/> 
      </div>
      <div class="properties">
        <h4 v-if="monitor.botName">{{ monitor.botName }}</h4>
        <h4 v-else>LSB Monitor</h4>
        <div class="monitor-inputs">
          <div v-for="monitorsource in monitor.monitorsources" v-bind:key="monitorsource.id">
            <MonitorSource v-bind:monitorsource="monitorsource" @deleteMonitorsource="deleteMonitorsourceButton"/>
          </div>
          <MonitorSource :add="true" @addMonitorsource="addMonitorsourceButton"/>
        </div>
      </div> 
      <div class="controls">
        <button class="button" v-on:click="message()">
          <b-icon icon="briefcase-fill" variant="white"/>
        </button>  
        <button class="button" v-on:click="edit()">
          <b-icon icon="pencil-fill" variant="white"/>
        </button>
        <button class="button" v-on:click="del()">
          <b-icon icon="trash-fill" variant="white"/>
        </button>
      </div>
    </div>
    <div class="error text-center">{{ error }}</div>    
    <b-modal v-bind:id="modalId" hide-header hide-footer centered>
      <form @submit.stop.prevent="" class="formMargin">
        <div class="form-label-group">
          <input type="text" id="inputWebhook" class="form-control" v-model="webHook" placeholder="Discord Webhook">
          <label for="inputWebhook">Discord Webhook</label>
        </div>
        <div class="form-label-group">
          <input type="text" id="inputBotname" class="form-control" v-model="botName" placeholder="Bot Name">
          <label for="inputBotname">Bot Name</label>
        </div>
        <div class="form-label-group">
          <input type="text" id="inputBotimage" class="form-control" v-model="botImage" placeholder="Bot Image">
          <label for="inputBotimage">Bot Image</label>
        </div>
        <button class="btn btn-sm btnClass btn-block text-uppercase" v-on:click="saveEditMonitor">Save</button> 
        <button class="btn btn-sm btnClass btn-block text-uppercase" v-on:click="cancelEditMonitor">Cancel</button>
      </form>
      <div class="error">{{ editMonitorError }}</div>
    </b-modal>
    <b-modal v-bind:id="modalIdDelete" hide-header hide-footer centered>
      <div class="text-center modal-delete">Do you really want to delete this monitor?</div>
      <button class="btn btn-sm btnClass btn-block text-uppercase" v-on:click="yesDeleteMonitor()">Yes</button> 
      <button class="btn btn-sm btnClass btn-block text-uppercase" v-on:click="cancelDeleteMonitor()">Cancel</button>
    </b-modal>
    <b-modal v-bind:id="modalIdAddSource" hide-footer centered title="Add source for alerts...">
      <div v-on:click="addSourceAll()" class="add-source-item">All</div>
      <div v-for="monitorpage in monitorpages" :key="monitorpage.id" v-on:click="addSourcePage(monitorpage.id)" class="add-source-item">
        {{ monitorpage.name }}        
      </div>
      <button class="btn btn-sm btnClass btn-block text-uppercase" v-on:click="cancelAddSource()">Cancel</button>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import Toggle from './Toggle.vue';
import MonitorSource from './MonitorSource.vue';

@Component({
  components: {
    Toggle,
    MonitorSource
  },
  props: {
    monitor: Object
  }
})
export default class Monitor extends Vue {
  $auth;
  $bvModal;

  @Action sendTestmessage;
  @Action updateMonitor;
  @Action updateMonitorRunning;
  @Action deleteMonitor;
  @Action getMonitorsources;
  @Action getProducts;
  @Action getMonitorpages;
  @Action addMonitorsource;
  @Action deleteMonitorsource;
  @Getter products;
  @Getter monitorpages;

  monitor;

  webHook = '';
  botName = '';
  botImage = '';

  modalId = 'modal' + this.monitor.id;
  modalIdDelete = 'modalDelete' + this.monitor.id;
  modalIdAddSource = 'modalAddSource' + this.monitor.id;

  error = '';
  editMonitorError = '';

  async mounted() {
    let accessToken = await this.$auth.getTokenSilently();
    await this.getMonitorsources({ id: this.monitor.id, accessToken  });
    await this.getMonitorpages({ accessToken });
    await this.getProducts({ accessToken });
  }

  async message() {
    this.error = await this.sendTestmessage({ id: this.monitor.id, accessToken: await this.$auth.getTokenSilently() });
    setTimeout(() => this.error = '', 5000);
  }

  del() {
    this.$bvModal.show(this.modalIdDelete);
  }

  async yesDeleteMonitor() {
    this.$bvModal.hide(this.modalIdDelete);
    this.error = await this.deleteMonitor({ id: this.monitor.id, accessToken: await this.$auth.getTokenSilently() });
    setTimeout(() => this.error = '', 5000);
  }

  cancelDeleteMonitor() {
    this.$bvModal.hide(this.modalIdDelete);
  }

  toggleValue = false;

  async updateToggle(value) {
    this.error = await this.updateMonitorRunning({ id: this.monitor.id, running: value, accessToken: await this.$auth.getTokenSilently() });
    setTimeout(() => this.error = '', 5000);
  }

  edit() {
    this.webHook = this.monitor.webHook;
    this.botName = this.monitor.botName;
    this.botImage = this.monitor.botImage;
    this.$bvModal.show(this.modalId);
  }

  async saveEditMonitor() {
    this.editMonitorError = await this.updateMonitor({ id: this.monitor.id, webHook: this.webHook, botName: this.botName, botImage: this.botImage, accessToken: await this.$auth.getTokenSilently() })
    if (this.editMonitorError == '')
      this.$bvModal.hide(this.modalId);
  }

  cancelEditMonitor() {
    this.$bvModal.hide(this.modalId);
  }

  addMonitorsourceButton() {
    this.$bvModal.show(this.modalIdAddSource);
  }

  async addSourcePage(id: string) {
    this.$bvModal.hide(this.modalIdAddSource);
    this.error = await this.addMonitorsource({ id: this.monitor.id, all: false, monitorpageId: id, accessToken: await this.$auth.getTokenSilently() });
    setTimeout(() => this.error = '', 5000);
  }

  async addSourceAll() {
    this.$bvModal.hide(this.modalIdAddSource);
    this.error = await this.addMonitorsource({ id: this.monitor.id, all: true, accessToken: await this.$auth.getTokenSilently() });
    setTimeout(() => this.error = '', 5000);
  }

  cancelAddSource() {
    this.$bvModal.hide(this.modalIdAddSource);
  }

  async deleteMonitorsourceButton(monitorsource) {
    this.error = await this.deleteMonitorsource({ id: this.monitor.id, monitorsourceId: monitorsource.id, accessToken: await this.$auth.getTokenSilently() });
    setTimeout(() => this.error = '', 5000);
  }
 }
</script>

<style scoped>
  .view {
    border-bottom: 1px solid black;
    padding: 10px;
  }

  .content {
    display: flex;
  }

  .column {
    width: 15%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-right: 10px;
  }

  .botImage {
    border-radius: 50%;
  }

  .toggle {
    margin: 0 auto;
  }

  .properties {
    width: 80%;
  }

  .controls {
    width: 5%;
    display: flex;
    flex-direction: column;
  }

  .button {
    background-color: #333;
    border: none;
    width: 2em;
    height: 2em;
    border-radius: 50%;
    transition: .2s;
    margin: 5px;
  }

  .button:hover {
    background-color: #db3e3e;
    transition: .2s;
  }

  .button:focus {
    outline: none;
  }

  .inputForm {
    margin: auto;
    width: 100px;
    border: 2px solid rgb(44, 44, 44);
  }

  .form-label-group {
    position: relative;
    margin-bottom: 1rem;
  }

  .form-label-group input {
    height: auto;
    border-radius: 2rem;
  }

  .form-label-group>input,
  .form-label-group>label {
    padding: .75rem 1.5rem;
  }

  .form-label-group>label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0;
    /* Override default `<label>` margin */
    line-height: 1.5;
    color: #495057;
    border: 1px solid transparent;
    border-radius: .25rem;
    transition: all .1s ease-in-out;
  }

  .form-label-group input::-webkit-input-placeholder {
    color: transparent;
  }

  .form-label-group input:-ms-input-placeholder {
    color: transparent;
  }

  .form-label-group input::-ms-input-placeholder {
    color: transparent;
  }

  .form-label-group input::-moz-placeholder {
    color: transparent;
  }

  .form-label-group input::placeholder {
    color: transparent;
  }

  .form-label-group input:not(:placeholder-shown) {
    padding-top: calc(.75rem + .75rem * (2 / 3));
    padding-bottom: calc(.75rem / 3);
  }

  .form-label-group input:not(:placeholder-shown)~label {
    padding-top: calc(.75rem / 3);
    padding-bottom: calc(.75rem / 3);
    font-size: 12px;
    color: #777;
  }

  .btnClass {
    margin-top: 20px;
    color: white;
    background-color: #db3e3e;    
    font-size: 80%;
    border-radius: 5rem;
    letter-spacing: .1rem;
    font-weight: bold;
    padding: 0.5rem;
    transition: all 0.2s;
  }
  
  .error {
    margin-top: 5px;
    color: #db3e3e;
  }

  .modal-delete {
    font-size: 1.25em;
  }

  .monitor-inputs {
    display: flex;
    flex-wrap: wrap;
  }

  .add-source-item {
    margin-bottom: 5px;
  }

  .add-source-item:hover {
    cursor: pointer;
    color: #db3e3e;
  }
</style>
