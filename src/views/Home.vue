<template>
  <div class="home">
    <div class="container">
      <h1 class="text-center">
        <img src="logo.png" width="70"/>
        <span id="title">Lazy Monitor</span>
      </h1>
      <div class="text-center margin">
        <p>Get your customizable Sneaker-Monitor for your Cook-Group.</p>
        <img class="embeds" src="Embeds.png"/>
      </div>     
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue { }
</script>

<style scoped>
  .margin {
    margin-top: 30px;
  }

  .embeds {
    width: 500px;
    max-width: 90vw; 
    margin: 50px auto;
  }

  #title {
    margin-left: 20px;
    font-weight: 500;
  }

  p {
    font-size: 1.4em;
  }
</style>