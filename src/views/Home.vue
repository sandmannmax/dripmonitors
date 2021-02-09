<template>
  <div class="home">
    <div class="container">
      <h1 class="title col-lg-7 col-md-9 col-sm-11 mx-auto">Providing Tools to help you grow your Sneaker Portfolio</h1>
      <div class="lazy-monitor">
        <h2 class="text-center"><span class="">Lazy Monitor</span> - the fastest customizable Monitors for your Cookgroup</h2>
        <div class="text-center margin">
          <img class="embeds" src="Embeds.png"/>
        </div>
        <div class="supported-sites">
          <h3 class="text-center">Supported Sites</h3>  
        </div>  
      </div>         
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  supported_sites = ['Nike SNKRS'];
}
</script>

<style scoped>
  .title {
    margin-bottom: 50px;
    font-weight: 600;
  }

  h2 {
    font-size: 1.5em;
  }

  h3 {
    font-size: 1.3em;
  }

  span {
    text-decoration: underline;
    text-decoration-color: #db3e3e;
  }

  .margin {
    margin-top: 30px;
  }

  .embeds {
    width: 500px;
    max-width: 90vw; 
    margin: 50px auto;
  }

  p {
    font-size: 1.4em;
  }
</style>