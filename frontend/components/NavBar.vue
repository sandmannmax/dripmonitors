<template>
  <nav class="shadow-md mb-4">
    <div
      class="md:container flex justify-between mx-auto h-20 items-center lg:px-16 px-6 bg-back z-10"
    >
      <div>
        <nuxt-link to="/"><img class="h-16 w-16" src="logo.png"/></nuxt-link>
      </div>

      <div class="hidden md:flex md:space-x-4 md:items-center">
        <!-- <nuxt-link class="text-2xl hover:text-gray-400 transition-colors" to="/monitor">Lazy Monitor</nuxt-link>
        <nuxt-link class="text-2xl hover:text-gray-400 transition-colors" to="/aio">Lazy AIO</nuxt-link>
        <span class="spacer h-6"/> -->
        <a
          class="text-2xl hover:text-gray-400 transition-colors"
          :href="dashboard"
          >Dashboard</a
        >
      </div>

      <label
        class="md:hidden block cursor-pointer"
        @click="menu_open = !menu_open"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current text-gray-800"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>
    </div>

    <transition name="slide-fade">
      <div
        class="flex flex-col space-y-4 w-screen bg-back transition-all transform shadow-md p-4 absolute"
        v-if="menu_open"
      >
        <!-- <nuxt-link class="text-2xl hover:text-gray-400 transition-colors" to="/monitor">Lazy Monitor</nuxt-link>
        <nuxt-link class="text-2xl hover:text-gray-400 transition-colors" to="/aio">Lazy AIO</nuxt-link>
        <span class="spacer-y w-6"/> -->
        <a
          class="text-2xl hover:text-gray-400 transition-colors"
          :href="dashboard"
          >Dashboard</a
        >
      </div>
    </transition>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
  menu_open = false
  window_width = window.innerWidth
  dashboard = 'https://app.lazyshoebot.com'

  created() {
    window.addEventListener('resize', this.onResize)
  }

  onResize() {
    if (window.innerWidth >= 768) this.menu_open = false
  }
}
</script>

<style>
.spacer {
  border-left: 2px solid #db3e3e;
}

.spacer-y {
  border-top: 2px solid #db3e3e;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
