<template>
  <b-navbar type="dark" id="navbar">
    <b-container>
      <b-navbar-nav>
        <router-link to="/" class="navbar-brand title" id="title"><img src="logo.png" width="60"/></router-link>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto"> 
        <button class="btn btn-class" v-on:click="login">Log In</button>
      </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ControlBar extends Vue {
  login() { 
    window.location.href = 'http://localhost:8081/login';
  }
}
</script>

<style scoped>
.btn-class {
  color: white;
  border-radius: 0;
  padding: 10px 15px;
  margin-left: 10px;
  border: 3px #db3e3e solid;
  transition: 250ms;
}

.btn-class:hover {
  color: white;
  background-color: #db3e3e;
  text-decoration: none;
  transition: 250ms;
}

#navbar {
  background-color: rgb(22, 21, 21);
}
</style>
