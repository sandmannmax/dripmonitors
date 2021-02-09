<template>
  <transition name="fade" id="loading-transition">
    <div id="loading-div">
      <img id="loading" src="loading.gif" width="150" height="150"/>
      <img id="logo" src="logo.png" width="50" height="50"/>
    </div>    
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import config from '../config';

@Component
export default class Logout extends Vue {
  $auth;
  
  mounted() {
    if (!this.$auth.isLoading)
      this.$auth.logout({ returnTo: config.return_url });
    else {
      this.$auth.$watch("isLoading", isLoading => {
        console.log(isLoading)
        if (isLoading === false) {
          this.$auth.logout({ returnTo: config.return_url });
        }
      });
    }    
  }
}
</script>

<style>
  #loading-div {
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: rgb(22, 21, 21); 
    z-index: 1;
  }
  
  #logo {
    position: absolute;
    left: calc(50vw - 25px);
    top: calc(50vh - 28px);
  }
  
  #loading {
    position: absolute;
    left: calc(50vw - 75px);
    top: calc(50vh - 75px);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>