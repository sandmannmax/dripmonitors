<template>
  <div class="flex flex-col mt-8">
    <h3 class="text-2xl font-semibold">Products</h3>
    <div class="flex flex-col sm:mx-8 mx-2">
      <Product v-for="product in products" :key="product.id" :product="product" :monitorpageId="monitorpageId" />
      <div v-if="!products || products.length == 0">No Products</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Product from './Product.vue';

@Component({
  components: { Product },
  props: {
    products: Array,
    monitorpageId: String
  }
})
export default class Products extends Vue {}
</script>