<template>
  <ul class="c-list">
    <ListItem v-for="(item, key) in items" :key="`${item}-${key}`">
      {{ item }}
    </ListItem>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListItem from "../ListItem/ListItem.vue";

export default defineComponent({
  components: {
    ListItem,
  },
  name: "ListItems",
  props: {
    items: Array,
  },
});
</script>
