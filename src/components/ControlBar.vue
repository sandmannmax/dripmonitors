<template>
  <b-navbar type="dark" id="navbar">
    <b-container>
      <b-navbar-nav>
        <router-link to="/" class="navbar-brand title" id="title"><img src="logo.png" width="60"/></router-link>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <a class="link" href="https://app.lazyshoebot.com">Monitor</a>
        <router-link class="link no-underline" to="/monitor">
          <div class="cta">Get Beta Access</div>
        </router-link>          
      </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ControlBar extends Vue { }
</script>

<style scoped>

.link {
  color: white;
  margin: auto 10px;
}

.no-underline {
  text-decoration: none;
}

.cta {
  padding: 10px;
  margin-left: 10px;
  border: 3px #db3e3e solid;
  transition: 250ms;
}

.cta:hover {
  color: white;
  background-color: #db3e3e;
  text-decoration: none;
  transition: 250ms;
}

#navbar {
  background-color: rgb(22, 21, 21);
}

.languagecontainer {
  height: 24px;
  background-color: rgb(54, 54, 54);
}

.language {
  color: white;
  font-size: 14px;
  vertical-align: middle;
}

.language:hover {
  text-decoration: underline;
}

</style>
