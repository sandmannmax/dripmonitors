<template>
  <div class="main-div">
    <div class="text-center margin">
      <router-link class="link" to="/terms">Terms of Service</router-link>
      <router-link class="link" to="/privacy">Privacy Policy</router-link>
    </div>
    <div class="text-center margin">
      &#169; 2021 lazyshoebot
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue { }
</script>

<style scoped>
  .main-div {
    height: 80px;
    color: white;
    background-color: rgb(22, 21, 21);
    text-decoration: none;
    padding: 5px 0px;
  }

  .margin {
    margin: 9px 0px;
  }

  .link {
    margin: 0px 15px;
    color: white;
  }
</style>
