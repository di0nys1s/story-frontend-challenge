<template>
  <li class="c-list-item" :key="index">
    {{ title }}
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListItem",
  props: {
    index: String,
    title: String,
  },
});
</script>
