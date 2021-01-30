<template>
  <div id="app">
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
</style>
