<template>
  <div class="container mx-auto">
    <div class="md:px-12 px-4 pb-4 flex flex-col" v-if="$auth.loggedIn && scope == 'admin'">
      <div class="flex flex-row items-center space-x-3">
        <h1 class="md:text-4xl text-3xl font-semibold">Admin</h1>
      </div>    
      <div class="text-red-500">{{ error }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component
export default class Admin extends Vue {
  $auth;
  $router;
  
  @Getter scope;

  error = '';

  async mounted() {
    if (!this.$auth.loggedIn || this.scope != 'admin')
      this.$router.push('/')
  }
}
</script>