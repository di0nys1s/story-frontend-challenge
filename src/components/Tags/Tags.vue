<template>
  <ul role="list" name="tags" class="c-tags">
    <Tag v-for="(item, key) in items" :item="item" :key="`${item}-${key}`" />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Tag from "../Tag/Tag.vue";
import "./Tags.css";

export default defineComponent({
  components: {
    Tag,
  },

  name: "TagsList",
  props: ["items"],
});
</script>
