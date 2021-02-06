<template>
  <b-navbar type="dark" id="navbar" toggleable="sm">
    <b-container>
      <b-navbar-nav>
        <router-link to="/" class="navbar-brand title" id="title"><img src="logo.png" width="60"/></router-link>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-if="$auth.isAuthenticated">
        <b-nav-item-dropdown right>
          <template #button-content><span id="user-dropdown">{{ $auth.user.nickname }}</span></template>
          <b-dropdown-item class="link" to="/profile">Profile</b-dropdown-item>
          <b-dropdown-item class="link" to="/logout">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component
export default class ControlBar extends Vue {
  @Getter user;
  @Getter hasMonitor;
  
  logout() { 
    this.$auth.logout();
  }
}
</script>

<style scoped>

.link {
  color: black;
  margin: auto 10px;
  transition: 250ms;
}

.link:hover {
  text-decoration: underline;
  transition: 250ms;
  cursor: pointer;
}

.r-link {
  color: black;
}

#navbar {
  background-color: rgb(22, 21, 21);
}

#title {
  font-size: 2em;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #db3e3e;
}

#user-dropdown {
  color: white;
}

</style>
