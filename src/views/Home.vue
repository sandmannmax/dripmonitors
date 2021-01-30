<template>
  <div class="view">
    <ControlBar/>
    <div class="main-content">
      <div class="container">
        <h3 class="text-center">lazyshoebot - Monitor</h3>
        <div id="monitorConfiguration">
          <div class="col-sm-11 col-md-9 col-lg-7 mx-auto">
            <div class="monitor" v-if="monitor">
              <div id="botContainer">
                <b-img v-bind:src="monitor.botImage" id="botImage"/>
              </div>            
              <h4 id="botName">{{ monitor.botName }}</h4>
            </div>
            <button class="btn btn-sm btnClass btn-block text-uppercase" v-on:click="editMonitor()">Edit</button>
            <button class="btn btn-sm btnClass btn-block text-uppercase" v-on:click="sendTestMessage()">Send Testmessage</button>     
          </div>
          
          <b-modal id="editMonitor" hide-header hide-footer centered>
            <form @submit.stop.prevent="" class="formMargin">
              <div class="form-label-group">
                <input type="text" id="inputWebhook" class="form-control" v-model="webHook" placeholder="Discord Webhook" required>
                <label for="inputWebhook">Discord Webhook</label>
              </div>
              <div class="form-label-group">
                <input type="text" id="inputBotname" class="form-control" v-model="botName" placeholder="Bot Name" required>
                <label for="inputBotname">Bot Name</label>
              </div>
              <div class="form-label-group">
                <input type="text" id="inputBotimage" class="form-control" v-model="botImage" placeholder="Bot Image" required>
                <label for="inputBotimage">Bot Image</label>
              </div>
              <button class="btn btn-sm btnClass btn-block text-uppercase" v-on:click="saveEditMonitor">Save</button> 
              <button class="btn btn-sm btnClass btn-block text-uppercase" v-on:click="cancelEditMonitor">Cancel</button>
            </form>
            <div class="error">{{ editMonitorError }}</div>
          </b-modal>        
        </div>       
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import ControlBar from '../components/ControlBar.vue';
import Footer from '../components/Footer.vue';

@Component({
  components: { ControlBar, Footer }
})
export default class Home extends Vue {
  @Action getMonitor;
  @Action sendTestmessage;
  @Action updateMonitor;
  @Getter user;
  @Getter monitor;

  webHook = '';
  botName = '';
  botImage = '';

  editMonitorError = '';

  async mounted() {
    if (!this.user)
      this.$router.push({ name: 'login' });
    else
      await this.getMonitor({ accessToken: this.user.accessToken, refreshToken: this.user.refreshToken });
  }

  sendTestMessage() {
    this.sendTestmessage({ accessToken: this.user.accessToken, refreshToken: this.user.refreshToken });
  }

  editMonitor() {
    this.webHook = this.monitor.webHook;
    this.botName = this.monitor.botName;
    this.botImage = this.monitor.botImage;
    this.$bvModal.show('editMonitor');
  }

  async saveEditMonitor() {
    this.editMonitorError = await this.updateMonitor({ webHook: this.webHook, botName: this.botName, botImage: this.botImage, accessToken: this.user.accessToken, refreshToken: this.user.refreshToken })
    if (this.editMonitorError == '')
      this.$bvModal.hide('editMonitor');
  }

  cancelEditMonitor() {
    this.$bvModal.hide('editMonitor');
  }
}
</script>

<style scoped>
  .main-content {
    min-height: calc(100vh - 166px);
    padding-top: 10px;
    padding-bottom: 4px;
    color: rgb(22, 21, 21); 
    background-color: #dfdfdf;
  }

  .monitor {
    display: flex;
    margin: 15px 0px;
  }

  #botContainer {
    height: 60px;
    width: 60px;
    margin-right: 10px;
    overflow: hidden;
    border-radius: 50%;
    position: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  #botImage {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-height: 100%;
    min-width: 100%;
  }

  #botName {
    margin: auto 0;
  }

  .button {
    color: white;
    background-color: #db3e3e;
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

  .form-signin {
    width: 100%;
  }

  .form-signin .btn {
    font-size: 80%;
    border-radius: 5rem;
    letter-spacing: .1rem;
    font-weight: bold;
    padding: 1rem;
    transition: all 0.2s;
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

  .error {
    margin-top: 5px;
    text-align: center;
    color: #db3e3e;
  }
</style>