<template>
  <div class="min-h-screen bg-secondary flex flex-col justify-center items-center">
    <img class="h-32 w-32" src="/logo.png"/>
    <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-0 sm:space-x-4 text-xl mt-4" v-if="!$auth.loggedIn">
      <nuxt-link class="bg-primary text-white rounded py-2 px-4 w-32 text-center" to="/login">Login</nuxt-link>
      <nuxt-link class="bg-primary text-white rounded py-2 px-4 w-32 text-center" to="/signup">Sign-Up</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component({
  layout: 'fullpage'
})
export default class NotAuthenticated extends Vue { }
</script>