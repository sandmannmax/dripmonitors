<template>
  <div class="min-h-screen text-secondary bg-back flex flex-col" id="app">
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class FullPage extends Vue { }
</script>

<style scoped>
@font-face {
  font-family: "Questrial";
  src: local("Questrial"),
    url(../static/Questrial-Regular.ttf) format("truetype");
}

#app {
  font-family: Questrial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
