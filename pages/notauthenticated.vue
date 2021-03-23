<template>
  <div class="min-h-screen bg-secondary flex flex-col justify-center items-center">
    <img class="h-32 w-32 mb-4" src="/logo.png"/>
    <div v-if="!$auth.loggedIn">
      <nuxt-link class="bg-primary text-white rounded px-4 py-3 text-center text-xl" to="/login" v-if="apiState == 'online'">Login</nuxt-link>
      <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-0 sm:space-x-4 text-xl text-white" v-else>
        API is offline, please try again later.
      </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component({
  layout: 'fullpage'
})
export default class NotAuthenticated extends Vue { 
  @Getter apiState;
  @Action getStatus;

  async mounted() {
    await this.getStatus();
  }
}
</script>