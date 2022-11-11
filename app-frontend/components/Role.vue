<template>
  <div class="flex sm:flex-row flex-col items-center text-secondary text-lg sm:border-0 border-b-2 border-gray-300" v-if="role">
    <span class="sm:w-5/12">@{{ role.name }}</span>
    <span class="flex-grow">{{ role.roleId }}</span>
    <span v-on:click="deleteRole()" class="flex w-6 sm:ml-1 items-center hover:text-gray-600 transition duration-150 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    role: {
      type: Object
    }
  }
})
export default class Role extends Vue {
  role;

  deleteRole() {
    this.$emit('deleteRole', this.role);
  }
}
</script>