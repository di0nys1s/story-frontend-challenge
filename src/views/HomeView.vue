<template>
  <DashboardPage />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DashboardPage from "@/components/Pages/DashboardPage/DashboardPage.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    DashboardPage,
  },
});
</script>
