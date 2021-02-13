<template>
  <div
    class="h-20 bg-secondary text-white flex flex-col justify-evenly items-center"
  >
    <div class="flex space-x-4">
      <nuxt-link
        class="hover:text-gray-400"
        to="/terms"
      >
        Terms of Service
      </nuxt-link>
      <nuxt-link
        class="hover:text-gray-400"
        to="/privacy"
      >
        Privacy Policy
      </nuxt-link>
    </div>
    <div>&#169; 2021 lazyshoebot</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {}
</script>
