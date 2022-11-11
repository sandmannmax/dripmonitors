<template>
  <b-navbar type="dark" id="navbar" toggleable="sm">
    <b-container>
      <b-navbar-nav class="ml-auto">
        <img src="logo.png" width="80"/>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-if="user">
        <div class="link" v-on:click="logoutButton()">Logout</div>
      </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

@Component
export default class Header extends Vue {
  @Getter user;
  @Action logout;

  async logoutButton() {
    await this.logout({ accessToken: this.user.accessToken, refreshToken: this.user.refreshToken });
    if (!this.user)
      this.$router.push({ name: 'login' });
  }
}
</script>

<style scoped>

.link {
  color: white;
  margin: auto 10px;
}

.link:hover {
  text-decoration: underline;
  cursor: pointer;
}

.btnCall {
  color: white;
  background-color: #db3e3e;
}

#navbar {
  background-color: rgb(22, 21, 21);
  border-bottom: 2px solid #db3e3e;
  margin-bottom: 10px; 
}

#title {
  font-size: 2em;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #db3e3e;
}

</style>
