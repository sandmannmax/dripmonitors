<template>
  <div class="view">
    <ControlBar/>
    <div class="main-content">
      <div class="container">
        <div class="col-sm-11 col-md-9 col-lg-7 mx-auto" v-if="user">
          <h3 class="text-center">Profile</h3>
          <div class="content" v-if="!editStatus">Username: {{ user.name }}</div>
          <div class="marginTop content" v-if="!editStatus">Mail: {{ user.mail }}</div>
          <button class="btn btn-sm btnClass btn-block text-uppercase" v-on:click="edit" v-if="!editStatus">Edit</button>
          <form class="form-signin" v-if="editStatus">
            <div class="form-label-group row">
              <input type="text" id="inputUsername" class="form-control col-11" v-model="username" v-bind:disabled="!changeUsername" placeholder="Username" required autofocus>
              <label for="inputUsername">Username</label>
              <input type="checkbox" class="col-1 checkbox" id="inputChangeUsername" v-model="changeUsername"/>
            </div>

            <div class="form-label-group row">
              <input type="text" id="inputMail" class="form-control col-11" v-model="mail" v-bind:disabled="!changeMail" placeholder="E-Mail" required autofocus>
              <label for="inputMail">E-Mail</label>
              <input type="checkbox" class="col-1 checkbox" id="inputChangeMail" v-model="changeMail"/>
            </div>

            <div class="form-label-group row">
              <input type="password" id="inputPasswordNew" class="form-control col-11" v-model="passwordNew" v-bind:disabled="!changePassword" placeholder="New Password" required>
              <label for="inputPasswordNew">New Password</label>
              <input type="checkbox" class="col-1 checkbox" id="inputChangePassword" v-model="changePassword"/>
            </div>

            <div class="form-label-group row">
              <input type="password" id="inputPasswordOld" class="form-control" v-model="passwordOld" placeholder="Old Password" required>
              <label for="inputPasswordOld">Old Password</label>
            </div>

            <button class="btn btn-sm btnClass btn-block text-uppercase" type="button" v-on:click="save">Save</button>
            <button class="btn btn-sm btnClass btn-block text-uppercase" type="button" v-on:click="cancel">Cancel</button>
          </form>                    
          <div class="divCenterMargin">
            <div class="error">{{ error }}</div>
          </div>
          <hr role="separator" aria-orientation="horizontal" class="dropdown-divider marginTop20">
          <button class="btn btn-sm btnClass btn-block text-uppercase" v-on:click="logoutForm">Logout</button>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import ControlBar from '../components/ControlBar.vue';
import Footer from '../components/Footer.vue';

@Component({
  components: { ControlBar, Footer }
})
export default class Profile extends Vue {
  @Action logout;
  @Action updateUser;
  @Getter user;

  editStatus = false;
  username = '';
  changeUsername = false;
  mail = '';
  changeMail = false;
  passwordNew = '';
  changePassword = false;
  passwordOld = '';
  error = '';
  
  mounted() {
    if (!this.user)
      this.$router.push({ name: 'login' });
  }

  async logoutForm() {
    await this.logout({ accessToken: this.user.accessToken, refreshToken: this.user.refreshToken });
    if (!this.user)
      this.$router.push('/');
  }

  edit() {
    this.username = '';
    this.mail = '';
    this.passwordOld = '';
    this.passwordNew = '';
    this.changeUsername = false;
    this.changeMail = false;
    this.changePassword = false;
    this.editStatus = true;
  }

  async save() {
    if (this.passwordOld) {
      let changedUsername = this.changeUsername ? this.username : undefined;
      let changedMail = this.changeMail ? this.mail : undefined;
      let changedPassword = this.changePassword ? this.passwordNew : undefined;
      this.error = await this.updateUser({ username: changedUsername, mail: changedMail, password: changedPassword, oldPassword: this.passwordOld, accessToken: this.user.accessToken, refreshToken: this.user.refreshToken });
      if (this.error == '') {
        this.editStatus = false;
      }
    } else
      this.error = 'Please provide your old password'
  }

  cancel() {
    this.editStatus = false;
    this.error = '';
  }
}
</script>

<style scoped>
  .main-content {
    min-height: calc(100vh - 166px);
    padding-top: 10px;
    padding-bottom: 4px;
    color: rgb(22, 21, 21); 
    background-color: #dfdfdf;
  }

  .content {
    font-size: 1.2em;
  }

  .form-signin {
    width: 100%;
  }

  .form-signin .btn {
    font-size: 80%;
    border-radius: 5rem;
    letter-spacing: .1rem;
    font-weight: bold;
    padding: 0.5rem;
    transition: all 0.2s;
  }

  .inputForm {
    margin: auto;
    width: 100px;
    border: 2px solid rgb(44, 44, 44);
  }

  .checkbox {
    margin: auto 0;
  }

  .form-label-group {
    position: relative;
    margin: 0 0 1rem 0;
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

  .error-fields {
    margin-top: 8px;
    text-align: center;
  }

  .signedIn-text {
    font-size: 1.1rem;
    text-align: center;
  }

  .btnClass {
    margin-top: 20px;
    color: white;
    background-color: #db3e3e;    
    font-size: 80%;
    border-radius: 5rem;
    letter-spacing: .1rem;
    font-weight: bold;
    padding: 0.5rem;
    transition: all 0.2s;
  }

  .marginTop {
    margin-top: 10px;
  }

  .marginTop20 {
    margin-top: 20px;
  }

  .divCenterMargin {
    margin-top: 8px;
    text-align: center;
  }

  .error {
    color: #db3e3e;    
  }
</style>