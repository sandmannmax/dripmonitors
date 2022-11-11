<template>
  <div class="flex flex-row text-secondary mb-1 items-center space-x-2" v-if="product">
    <img :src="product.img" class="w-20" />
    <div class="flex flex-row flex-grow justify-between items-center">
      <a :href="product.href" target="blank" class="cursor-pointer">{{ product.name }}</a>
      <Toggle :value="product.monitored" @input="updateMonitored" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Toggle from '../Toggle.vue';

const adminModule = namespace('adminModule');

@Component({
  components: { Toggle },
  props: {
    product: Object,
    monitorpageId: String
  }
})
export default class Product extends Vue {
  $auth;
  product;
  monitorpageId;

  @adminModule.Action activateMonitoringProduct;
  @adminModule.Action disableMonitoringProduct;

  async updateMonitored(value) {
    if (value === true) {
      await this.activateMonitoringProduct({ productId: this.product.id, monitorpageId: this.monitorpageId, auth: this.$auth });
    } else {
      await this.disableMonitoringProduct({ productId: this.product.id, monitorpageId: this.monitorpageId, auth: this.$auth });
    }
  }
}
</script>