<template>
  <b-navbar type="dark" id="navbar" toggleable="sm">
    <b-container>
      <b-navbar-nav>
        <router-link to="/" class="navbar-brand title" id="title"><img src="logo.png" width="60"/></router-link>
      </b-navbar-nav>
      <b-navbar-toggle target="nav-collapse" v-if="user"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav v-if="user">
        <b-navbar-nav class="ml-auto">
          <router-link class="link" to="/profile">Hello, {{ user.name }}</router-link>
        </b-navbar-nav>
      </b-collapse>
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
}
</script>

<style scoped>

.link {
  color: white;
  margin: auto 10px;
}

.btnCall {
  color: white;
  background-color: #db3e3e;
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

</style>
