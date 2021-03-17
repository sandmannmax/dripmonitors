<template>
  <nav class="shadow-md mb-4">
    <div
      class="md:container flex justify-between mx-auto h-20 items-center lg:px-16 px-6 bg-back z-10"
    >
      <div>
        <nuxt-link to="/"><img class="h-16 w-16" src="/logo.png"/></nuxt-link>
      </div>

      <div class="hidden md:flex md:space-x-4 md:items-center" v-if="$auth.loggedIn">
        <div>
          <span @click="toggleDropdown" class="flex flex-row items-center text-xl md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-500 transition duration-150 transition-colors cursor-pointer">
            <span>{{ $auth.user.name }}</span>
            <svg fill="currentColor" viewBox="0 0 20 20" :class="{'rotate-180': open, 'rotate-0': !open}" class="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </span>
          <transition name="slide-fade">
            <div v-if="open" v-on-clickaway="hideDropdown" class="absolute mt-2 ml-24">
              <div class="px-10 pt-2 pb-4 bg-back border-2 border-gray-50 rounded-lg shadow-lg">
                <div class="flex flex-col">
                  <nuxt-link @click.native="open = !open" class="p-2 hover:text-gray-500" to="/profile">
                    Profile
                  </nuxt-link>

                  <nuxt-link @click.native="open = !open" class="p-2 hover:text-gray-500" to="/admin" v-if="isAdmin">
                    Admin
                  </nuxt-link>

                  <nuxt-link @click.native="open = !open" class="px-2 pt-2 hover:text-gray-500" to="/logout">
                    Logout
                  </nuxt-link>                  
                </div>
              </div>
            </div>
          </transition>
          
        </div>    
      </div>

      <div class="hidden md:flex md:space-x-4 md:items-center" v-if="!$auth.loggedIn">
        <nuxt-link class="text-xl px-2 pt-2 hover:text-gray-500 transition-colors duration-150" to="/login">
          Login
        </nuxt-link>
      </div>

      <label
        class="md:hidden block cursor-pointer"
        @click="menu_open = !menu_open"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current text-gray-800"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>
    </div>

    <transition name="slide-fade">
      <div
        class="flex flex-col space-y-4 w-screen bg-back transition-all transform shadow-md p-4 absolute"
        v-if="menu_open"
      >
        <nuxt-link @click.native="menu_open = !menu_open" class="text-xl px-2 hover:text-gray-500 transition-colors duration-150" to="/profile" v-if="$auth.loggedIn">
          Profile
        </nuxt-link>

        <nuxt-link @click.native="menu_open = !menu_open" class="text-xl px-2 pt-2 hover:text-gray-500 transition-colors duration-150" to="/admin" v-if="isAdmin">
          Admin
        </nuxt-link>

        <nuxt-link @click.native="menu_open = !menu_open" class="text-xl px-2 pt-2 hover:text-gray-500 transition-colors duration-150" to="/logout" v-if="$auth.loggedIn">
          Logout
        </nuxt-link>

        <nuxt-link @click.native="menu_open = !menu_open" class="text-xl px-2 pt-2 hover:text-gray-500 transition-colors duration-150" to="/login" v-if="!$auth.loggedIn">
          Login
        </nuxt-link>
      </div>
    </transition>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mixin as clickaway } from 'vue-clickaway';
import { namespace } from 'vuex-class';

const userModule = namespace('userModule');

@Component({
  mixins: [ clickaway ]
})
export default class NavBar extends Vue {
  $auth;

  @userModule.Getter scope;

  menu_open = false
  window_width = window.innerWidth
  dashboard = 'https://app.lazyshoebot.com'

  open = false;
  canClose = false;

  isAdmin = false;

  created() {
    window.addEventListener('resize', this.onResize)
  }

  mounted() {
    this.upadetIsAdmin();
  }

  @Watch('scope')
  upadetIsAdmin() {
    this.isAdmin = (this.scope === 'admin');
  }

  linkClicked() {
    console.log('link clicked')
  }

  onResize() {
    if (window.innerWidth >= 768) this.menu_open = false
  }

  toggleDropdown() {
    this.open = !this.open;
  }

  hideDropdown() {
    this.open = false;
  }

  login() {
    this.$auth.loginWith('auth0');
  }

  logout() {
    this.$auth.logout();
  }
}
</script>

<style>
.spacer {
  border-left: 2px solid #db3e3e;
}

.spacer-y {
  border-top: 2px solid #db3e3e;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
