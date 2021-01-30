<template>
  <div class="view">
    <div class="container center-box">
      <div class="col-sm-11 col-md-9 col-lg-7 mx-auto" v-if="!user">
        <div class="image-container">
          <img src="logo.png" alt="lazyshoebot logo" id="logo"/>
        </div>          
        <form class="form-signin">
          <div class="form-label-group">
            <input type="text" id="inputUsername" class="form-control" v-model="input.username" placeholder="Username" required autofocus>
            <label for="inputUsername">Username</label>
          </div>

          <div class="form-label-group">
            <input type="password" id="inputPassword" class="form-control" v-model="input.password" placeholder="Password" required>
            <label for="inputPassword">Password</label>
          </div>

          <button class="btn btn-lg btnClass btn-block text-uppercase" type="button" v-on:click="loginForm()">Login</button>
        </form>
        <div class="divCenterMargin">
          <div class="error">{{ error }}</div>
        </div>
        <div class="divCenterMargin">
          Don't have an account yet? Activate your monitor <router-link to="/activate">here</router-link>.
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import Footer from '../components/Footer.vue';

@Component({
  components: { Footer }
})
export default class Login extends Vue {
  @Action login;
  @Getter user;

  input = {
    username: '',
    password: ''
  };
  error = ''

  mounted() {
    if (this.user)
      this.$router.push({name: 'home'});
  }

  async loginForm() {
    this.error = '';
    if (this.input.username != '' && this.input.password != '') {
      this.error = await this.login({username: this.input.username, password: this.input.password});
      if (this.user) {
        this.$router.push({name: 'home'});
      }
    } else if (this.input.username == '')
      this.error = 'Please provide a username';
    else
      this.error = 'Please provide a password';
  }
}
</script>

<style scoped>
  @media (min-device-height: 651px) {
    .center-box {
      padding-top: 80px;
      display: flex;
      height: calc(100vh - 80px);
      flex-direction: column;
      justify-content: center;
    }
  }

  .image-container {
    display: flex;
    justify-content: center;
  }

  #logo {
    max-width: 250px;
  }

  .form-signin {
    width: 100%;
  }

  .form-signin .btn {
    font-size: 80%;
    border-radius: 5rem;
    letter-spacing: .1rem;
    font-weight: bold;
    padding: 1rem;
    transition: all 0.2s;
  }

  .inputForm {
    margin: auto;
    width: 100px;
    border: 2px solid rgb(44, 44, 44);
  }

  .form-label-group {
    position: relative;
    margin-bottom: 1rem;
  }

  .form-label-group input {
    height: auto;
    border-radius: 2rem;
  }

  .form-label-group>input,
  .form-label-group>label {
    padding: .75rem 1.5rem;
  }

  .form-label-group>label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0;
    /* Override default `<label>` margin */
    line-height: 1.5;
    color: #495057;
    border: 1px solid transparent;
    border-radius: .25rem;
    transition: all .1s ease-in-out;
  }

  .form-label-group input::-webkit-input-placeholder {
    color: transparent;
  }

  .form-label-group input:-ms-input-placeholder {
    color: transparent;
  }

  .form-label-group input::-ms-input-placeholder {
    color: transparent;
  }

  .form-label-group input::-moz-placeholder {
    color: transparent;
  }

  .form-label-group input::placeholder {
    color: transparent;
  }

  .form-label-group input:not(:placeholder-shown) {
    padding-top: calc(.75rem + .75rem * (2 / 3));
    padding-bottom: calc(.75rem / 3);
  }

  .form-label-group input:not(:placeholder-shown)~label {
    padding-top: calc(.75rem / 3);
    padding-bottom: calc(.75rem / 3);
    font-size: 12px;
    color: #777;
  }

  .divCenterMargin {
    margin-top: 8px;
    text-align: center;
  }

  .btnClass {
    color: white;
    background-color: #db3e3e;    
  }

  .error {
    color: #db3e3e;    
  }
</style>