<template>
  <div role="list" :class="['c-list', additionalClass]">
    <ListItem
      v-for="(item, key) in items"
      :item="item"
      :key="`${item}-${key}`"
      @handleListItemClick="handleListItemClick"
    />
  </div>
</template>

<script lang="ts">
import { IListItem } from "@/interfaces";
import { defineComponent } from "vue";
import ListItem from "../ListItem/ListItem.vue";
import "./ListItems.css";

export default defineComponent({
  components: {
    ListItem,
  },
  methods: {
    handleListItemClick(item: IListItem) {
      this.$emit("handleListItemClick", item);
    },
  },
  name: "ListItems",
  props: ["items", "additionalClass"],
});
</script>
