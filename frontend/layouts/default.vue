<template>
  <div class="min-h-screen text-secondary bg-back flex flex-col" id="app">
    <NavBar />

    <section class="mb-auto">
      <nuxt />
    </section>

    <Footer />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import NavBar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";

@Component({
  components: { NavBar, Footer }
})
export default class Default extends Vue { }
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
