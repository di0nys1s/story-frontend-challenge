<template>
  <span :class="['c-message-box', additionalClass]">
    {{ message }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import "./MessageBox.css";

export default defineComponent({
  name: "MessageBox",
  props: ["additionalClass", "message"],
});
</script>
