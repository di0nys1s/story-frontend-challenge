<template>
  <button
    @click="handleListItemClick(item)"
    class="c-list-item"
    type="button"
    role="list-item"
    :key="`${item.id}-${item.value}`"
  >
    {{ item.name }}
  </button>
</template>

<script lang="ts">
import { IListItem } from "@/interfaces";
import { defineComponent } from "vue";

import "./ListItem.css";

export default defineComponent({
  methods: {
    handleListItemClick(item: IListItem) {
      this.$emit("handleListItemClick", item);
    },
  },
  name: "ListItem",
  props: ["item", "onClick"],
});
</script>
