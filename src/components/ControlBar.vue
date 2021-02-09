<template>
  <b-navbar id="navbar" toggleable="sm" >
    <b-container>
      <b-navbar-nav>
        <router-link to="/" class="navbar-brand title" id="title"><img src="logo.png" width="60"/></router-link>
      </b-navbar-nav>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <router-link class="nav-element" to="/">Lazy Monitor</router-link>
          <router-link class="nav-element" to="/">Lazy AIO</router-link>
          <span class="spacer"/>
          <a class="nav-element" :href="dashboard">Dashboard</a>
        </b-navbar-nav>
      </b-collapse>      
    </b-container>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import config from '../config';

@Component({})
export default class ControlBar extends Vue {

  dashboard = config.login_url;
}
</script>

<style scoped>

#title:hover {
  transform: scaleX(1.05) scaleY(1.05);
  transition: transform 0.2s;
}

.nav-element {
  color: #2c3e50;
  font-size: 1.3em;
  transition: 0.5s;
  margin: 0px 10px;
}

.nav-element:hover {
  text-decoration: none;
  cursor: pointer;
  color: #7c8188;
}

@media only screen and (max-width: 575px) {
  .spacer {
    width: 150px;
    border-top: 1px solid #db3e3e;
  }

  #nav-collapse {
    border-top: 1px solid #2c3e50;
    padding: 5px;
  }
}

.spacer {
  border-left: 1px solid #db3e3e;
  margin: 5px 0px;
}

#navbar {
  background-color: transparent;
}
</style>
