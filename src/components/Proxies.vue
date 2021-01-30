<template>
  <div class="proxies-component">
    <h3>Proxies</h3>
    <form class="form-addproxy">
      <input type="text" v-model="address" class="inputForm" placeholder="Address"/>
      <input type="text" v-model="port" class="inputForm" placeholder="Port"/>
      <button type="button" v-on:click="addProxyButton()" class="btn btn-lg btnClass text-uppercase">Add</button>
    </form>
    <div class="error-div">{{ error }}</div>
    <div class="proxy-list">
      <div v-for="proxy in proxies" v-bind:key="proxy._id">{{ proxy.address }}:{{ proxy.port }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

@Component
export default class Proxies extends Vue {
  @Getter user;
  @Getter proxies;
  @Action getProxies;
  @Action addProxy;

  address = "";
  port = "";
  error = "";

  async addProxyButton() {
    this.error = "";

    if (!this.address) {
      this.error = "Address cant be empty";
      return;
    }

    if (!this.port) {
      this.error = "Port cant be empty"
      return;
    }
    
    let portNumber = Number.parseInt(this.port);

    if (Number.isNaN(portNumber) || portNumber < 1 || portNumber > 65535) {
      this.error = "Port isnt a valid port-number"
      return;
    } 

    this.error = await this.addProxy({ address: this.address, port: portNumber, accessToken: this.user.accessToken, refreshToken: this.user.refreshToken });

    this.address = "";
    this.port = "";
  }

  async mounted() {
    if (this.user)      
      await this.getProxies({ accessToken: this.user.accessToken, refreshToken: this.user.refreshToken });
  }
}
</script>

<style scoped>
  .proxies-component {
    margin: 10px;
    padding: 10px;
    border: 1px solid #eee;
  }
  
  .form-addproxy {
    width: 100%;
  }

  .form-addproxy .btn {
    font-size: 80%;
    letter-spacing: .1rem;
    font-weight: bold;
    padding: 0.2rem;
    transition: all 0.2s;
  }

  .inputForm {
    margin: auto;
    width: 100px;
    border: 2px solid rgb(44, 44, 44);
  }

  .btnClass {
    color: white;
    background-color: #db3e3e;    
  }

  .proxy-list {
    margin-top: 10px;
    padding: 5px 10px;
    border: 1px solid white;
  }

</style>
