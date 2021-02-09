<template>
  <div class="view-m">
    <span v-if="monitorsource && monitorsource.monitorpage">{{ monitorsource.monitorpage.name }} <b-icon icon="x-circle" class="icon" v-on:click="deleteMonitorsource()"/></span>
    <span v-if="monitorsource && monitorsource.product">{{ monitorsource.product.name }} <b-icon icon="x-circle" class="icon" v-on:click="deleteMonitorsource()"/></span>
    <span v-if="monitorsource && monitorsource.all">All <b-icon icon="x-circle" class="icon" v-on:click="deleteMonitorsource()"/></span>
    <span v-if="add">Add <b-icon icon="plus-circle-fill" class="icon" v-on:click="addMonitorsource()"/></span>    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    monitorsource: {
      type: Object
    },
    add: {
      type: Boolean,
      default: false
    }
  }
})
export default class Monitorsource extends Vue {
  monitorsource;

  addMonitorsource() {
    this.$emit('addMonitorsource');
  }

  deleteMonitorsource() {
    this.$emit('deleteMonitorsource', this.monitorsource);
  }
}
</script>

<style scoped>
  .view-m {
    background-color: #555;
    color: #efefef;
    display: inline-block;
    border-radius: 13px;
    height: 26px;
    padding: 1px 4px;
    margin-right: 5px;
    margin-bottom: 3px;
  }

  .icon:hover {
    cursor: pointer;
    color: #bbb;
  }
</style>
