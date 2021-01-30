<template>
  <div class="container">
    <h3 class="text-center">Request Free Beta-Testing Access</h3>
    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto" v-if="!betaRequestSent">
      <form class="form-signin">
        <div class="form-label-group">
          <input type="email" id="inputEmail" class="form-control" v-model="email" placeholder="E-Mail" required autofocus>
          <label for="inputEmail">E-Mail</label>
        </div>

        <button class="btn btn-lg btnClass btn-block text-uppercase" type="button" v-on:click="submit()">Request Access</button>
      </form>
      <div class="divCenterMargin">
        <div class="error">{{ error }}</div>
      </div>
    </div>
    <div class="divCenterMargin" v-else>Thank you for your request! We will contact you soon</div>
  </div>  
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component
export default class Monitor extends Vue {
  @Action requestBetaAccess;
  @Getter betaRequestSent;

  email: string = '';
  error: string = '';

  async submit() {
    this.error = '';
    if (this.email && /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(this.email))
      this.error = await this.requestBetaAccess({ mail: this.email });
    else
      this.error = 'Please provide a valid email';
  }
}
</script>

<style scoped>  
  .home {
    padding: 50px 0px;
  }

  h3 {
    text-align: center;
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

  .signedIn-text {
    font-size: 1.1rem;
    text-align: center;
  }

  .btnClass {
    color: white;
    background-color: #db3e3e;    
  }

  .error {
    margin-top: 5px;
    text-align: center;
    color: #db3e3e;
  }
</style>