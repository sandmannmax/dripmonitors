<template></template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push('/');
    } else {
      this.$auth.loginWith('auth0');
    }
  }
}
</script>