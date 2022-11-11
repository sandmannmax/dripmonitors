<template>
  <div class="container mx-auto" v-if="$auth.loggedIn && scope == 'admin'">
    <div class="md:px-12 px-4 pb-4 flex flex-col">
      <div class="flex flex-col space-y-3">
        <h1 class="md:text-4xl text-3xl font-semibold">Admin</h1>
        <Monitorpages/>
        <Proxies/>
      </div>    
      <div class="text-red-500">{{ error }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Proxies from '../../components/admin/Proxies.vue';
import Monitorpages from '../../components/admin/Monitorpages.vue';

const userModule = namespace('userModule');

@Component({
  components: { Proxies, Monitorpages }
})
export default class Admin extends Vue {
  $auth;
  $router;
  
  @userModule.Getter scope;

  error = '';
}
</script>