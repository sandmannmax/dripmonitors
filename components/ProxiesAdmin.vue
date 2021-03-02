<template>
  <div class="proxies-component">
    <h2 class="text-2xl">Proxies</h2>
    <div class="border-2 border-gray-200 p-2 space-y-2">
      <form class="flex space-x-4 items-center">
        <input type="text" v-model="address" placeholder="Address" class="border-2 border-gray-400 w-32 p-1"/>
        <button type="button" v-on:click="addProxyButton()" class="bg-primary hover:bg-accent transition duration-150 text-white px-4 py-1 rounded">Add</button>
      </form>
      <div class="text-red-500">{{ error }}</div>
      <div class="proxy-list">
        <div v-for="proxyAdmin in proxiesAdmin" v-bind:key="proxyAdmin.id">{{ proxyAdmin.address }} - {{ proxyAdmin.cc }}</div>
      </div>  
    </div>    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

@Component
export default class ProxiesAdmin extends Vue {
  $auth;

  @Getter proxiesAdmin;
  @Action getProxiesAdmin;
  @Action addProxyAdmin;

  address = "";
  error = "";

  async addProxyButton() {
    this.error = "";

    if (!this.address) {
      this.error = "Address cant be empty";
      return;
    }

    this.error = await this.addProxyAdmin({ address: this.address, accessToken: this.$auth.strategy.token.get() });

    this.address = "";
  }

  async mounted() {    
    await this.getProxiesAdmin({ accessToken: this.$auth.strategy.token.get() });
  }
}
</script>