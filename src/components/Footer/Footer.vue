<template>
  <footer class="c-footer">
    <p class="c-footer__text">
      Made with
      <img
        class="c-footer-logo"
        src="@/assets/passion.webp"
        alt="passion"
        loading="lazy"
      />
      by
      <a
        class="c-footer__link"
        :href="creatorLink"
        target="_blank"
        rel="noopener noreferrer"
        >{{ creator }}</a
      >
    </p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import "./Footer.css";

export default defineComponent({
  name: "PageFooter",
  props: ["creator", "logoSrc", "logoAlt", "creatorLink"],
});
</script>
