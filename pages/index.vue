<template>
  <div>
    <div class="mx-auto max-w-2xl sm:px-8 px-4 sm:py-10 py-6 flex flex-col">
      <h1 class="sm:text-4xl text-3xl font-bold">
        Providing <span class="underline u-color-accent">simple</span> tools to give your Cook-Group Members an extraordinary experience
      </h1>
      <button
        @click="monitorBetaAccess"
        class="rounded p-4 text-xl text-white bg-secondary hover:text-white font-semibold mt-6 mx-auto transition hover:bg-accent focus:ring-2 focus:ring-green-200"
      >
        Get Monitor Beta Access
      </button>
    </div>
    <div class="bg-secondary text-white">
      <div class="container mx-auto sm:p-8 p-4">
        <h2 class="text-2xl font-semibold mb-4">Lazy Monitor</h2>
        <h3 class="text-xl">
          The fastest customizable Monitors for your Cookgroup
        </h3>
        <img class="mx-auto my-12" src="embeds.png" />
        <h3 class="text-center underline text-2xl">Supported Sites</h3>
        <div class="flex flex-row justify-evenly py-6 flex-wrap">
          <SupportedSite
            v-for="supported_site in supported_sites"
            :key="supported_site"
            :site="supported_site"
          />
        </div>
      </div>
    </div>
    <div>
      <div class="container mx-auto py-8 sm:px-8 px-4 flex flex-col">
        <h2 class="text-center sm:text-3xl text-2xl mb-6 font-bold">
          Test our Monitor in Beta for free!
        </h2>
        <button
          @click="monitorBetaAccess"
          class="rounded p-4 text-xl text-white bg-secondary hover:text-white font-semibold mx-auto transition hover:bg-accent"
        >
          Get Monitor Beta Access
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import SupportedSite from "../components/SupportedSite.vue";

@Component({
  components: { SupportedSite }
})
export default class Index extends Vue {
  supported_sites = ['Nike SNKRS', 'Afew Store', 'Supreme', 'Zalando'];

  monitorBetaAccess() {
    window.location = "https://app.lazyshoebot.com";
  }
}
</script>

<style scoped>
.u-color-primary {
  text-decoration-color: #db3e3e;
}

.u-color-accent {
  text-decoration-color: #f5bf64;
}
</style>
