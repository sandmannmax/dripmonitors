<template>
  <div class="rounded bg-back p-2 text-black text-xl m-4 w-36 text-center">
    {{ site }}
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component()
export default class SupportedSite extends Vue {
  @Prop({ type: String, required: true }) site;
}
</script>
