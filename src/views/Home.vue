<template>
  <div class="view">
    <ControlBar/>
    <div class="main-content">
      <div class="container">
        <h3 class="text-center">lazyshoebot - Monitor</h3>
        <div>
          <div class="col-sm-11 col-md-9 col-lg-7 mx-auto">
            <div class="flex">
              <h3>Monitors</h3>
              <button class="add-button" v-on:click="addMonitorButton()">
                <b-icon icon="plus-circle-fill" variant="white" class="icon"/>
              </button>
            </div>    
            <div class="error">{{ error }}</div>        
            <div class="monitors" v-if="monitors">
              <div v-for="monitor in monitors" v-bind:key="monitor.id" class="monitor-wrapper">
                <Monitor v-bind:monitor="monitor"/>
              </div>
            </div>    
          </div>       
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
import Monitor from '../components/Monitor.vue';


@Component({
  components: { ControlBar, Monitor, Footer }
})
export default class Home extends Vue {
  $auth;
  $bvModal;

  @Action getMonitors;
  @Action addMonitor;
  @Getter monitors;

  error = '';

  async mounted() {
    await this.getMonitors({ accessToken: await this.$auth.getTokenSilently() });
  }

  async addMonitorButton() {
    this.error = await this.addMonitor({ accessToken: await this.$auth.getTokenSilently() });
    setTimeout(() => this.error = '', 5000);
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

  .monitors {
    margin: 15px 0px;
  }  

  .flex {
    display: flex;
  }

  .flex h3 {
    margin: auto 0;
    margin-right: 5px;
  }
  
  .error {
    margin-top: 5px;
    text-align: center;
    color: #db3e3e;
  }

  .add-button {
    background-color: #333;
    border: none;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    transition: .2s;
    margin: auto 5px;
  }

  .add-button:hover {
    background-color: #db3e3e;
    transition: .2s;
  }

  .add-button:focus {
    outline: none;
  }

  .icon {
    width: 16px;
    margin-left: -2px;
  }

  .monitor-wrapper {
    width: 100%;
  }
</style>