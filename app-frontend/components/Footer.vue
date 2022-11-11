<template>
  <div class="bg-secondary text-white flex flex-col items-center">
    <div class="m-4 text-center">
      For questions and feedback join <a class="text-blue-400 hover:text-blue-500 transition-colors duration-150" href="https://www.lazyshoebot.com/discord" target="blank">our Discord server</a> or contact <a class="text-blue-400 hover:text-blue-500 transition-colors duration-150" href="mailto:mail@lazyshoebot.com" target="blank">mail@lazyshoebot.com</a>
    </div>
    <div class="mb-4 flex space-x-4">
      <a class="hover:text-gray-400" href="https://www.lazyshoebot.com/terms.pdf" target="blank">Terms of Service</a>
      <a class="hover:text-gray-400" href="https://www.lazyshoebot.com/privacy.pdf" target="blank">Privacy Policy</a>    
      <span>&#169; 2021 lazyshoebot</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Footer extends Vue { }
</script>
