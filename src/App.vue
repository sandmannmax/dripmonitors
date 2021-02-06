<template>
  <div id="app">
    <transition name="fade" id="loading-transition">
      <div id="loading-div" v-if="$auth.isLoading">
        <img id="loading" src="loading.gif" width="150" height="150"/>
        <img id="logo" src="logo.png" width="50" height="50"/>
      </div>    
    </transition>
    <router-view/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue { }
</script>

<style>
  @font-face {
    font-family: "Questrial";
    src: local("Questrial"),
    url(../public/Questrial-Regular.ttf) format("truetype");
  }

  #app {   
    font-family: Questrial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #dfdfdf;
    background-color: rgb(22, 21, 21); 
    min-height: 100vh;
  }

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
