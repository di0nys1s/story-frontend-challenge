<template>
  <li class="c-tag" :key="item">
    {{ item }}
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import "./Tag.css";

export default defineComponent({
  name: "TagItem",
  props: ["item"],
});
</script>
