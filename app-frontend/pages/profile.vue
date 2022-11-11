<template>
  <div class="container mx-auto">
    <div class="md:px-12 px-4 pb-4 flex sm:flex-row flex-col justify-center items-center">
      <img
        :src="$auth.user.picture"
        alt="User's profile picture"
        class="rounded-full m-2 w-20 h-20"
      />
      <div class="flex flex-col space-y-2 m-2">
        <p>Name: {{ $auth.user.name }}</p>
        <p>E-Mail: {{ $auth.user.email }}</p>
        <p>Nickname: {{ $auth.user.nickname }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Profile extends Vue { 
  $auth;
  $router;

  mounted() {
    if (!this.$auth.loggedIn)
      this.$router.push('/');
  }
}
</script>