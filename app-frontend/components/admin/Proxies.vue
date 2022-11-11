<template>
  <div class="proxies-component">
    <h2 class="text-2xl">Proxies</h2>
    <div class="border-2 border-gray-200 p-2 space-y-2">
      <form class="flex space-x-4 items-center">
        <input type="text" v-model="address" placeholder="Address" class="border-2 border-gray-400 w-64 p-1"/>
        <input type="text" v-model="cc" placeholder="CC" class="border-2 border-gray-400 w-16 p-1"/>
        <button type="button" v-on:click="addProxyButton()" class="bg-primary hover:bg-accent transition duration-150 text-white px-4 py-1 rounded">Add</button>
      </form>
      <div class="text-red-500">{{ error }}</div>
      <div class="proxy-list" v-if="proxies">
        <div v-for="proxy in proxies" v-bind:key="proxy.id">{{ proxy.address }} - {{ proxy.cc }}
          <button type="button" v-on:click="deleteProxyButton(proxy.id)" class="bg-primary hover:bg-accent transition duration-150 text-white px-4 py-1 rounded">Delete</button>
        </div>
      </div>  
    </div>    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const adminModule = namespace('adminModule');

@Component
export default class Proxies extends Vue {
  $auth;

  @adminModule.Getter proxies;
  @adminModule.Action getProxies;
  @adminModule.Action addProxy;
  @adminModule.Action deleteProxy;

  address = "";
  cc = "";
  error = "";

  async addProxyButton() {
    this.error = "";

    if (!this.address) {
      this.error = "Address cant be empty";
      return;
    }

    if (!this.cc) {
      this.error = "CC cant be empty";
      return;
    }

    this.error = await this.addProxy({ address: this.address, cc: this.cc, auth: this.$auth });

    this.address = "";
    this.cc = "";
  }

  async deleteProxyButton(id: string) {
    this.error = await this.deleteProxy({ id, auth: this.$auth });
  }

  async mounted() {    
    await this.getProxies({ auth: this.$auth });
  }
}
</script>