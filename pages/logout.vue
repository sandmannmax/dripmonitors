<template></template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component
export default class Logout extends Vue {
  $auth;
  $router;

  @Action clearData;

  mounted() {
    if (this.$auth.loggedIn) {
      this.clearData();
      this.$auth.logout();
    } else
      this.$router.push('/');
  }
}
</script>