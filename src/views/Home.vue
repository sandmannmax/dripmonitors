<template>
  <div class="home">
    <Header/>
    <Proxies v-if="user"/>
    <Monitors v-if="user"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class'
import Header from '../components/Header.vue'
import Proxies from '../components/Proxies.vue'
import Monitors from '../components/Monitors.vue'

@Component({
  components: {
    Header,
    Proxies,
    Monitors
  }
})
export default class Home extends Vue {
  @Getter user;

  async mounted() {
    if (!this.user)
      this.$router.push({ name: 'login' });
  }
}
</script>
