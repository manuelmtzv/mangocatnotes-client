<template>
  <footer class="footer">
    <div class="content flex-between-center">
      <p class="footer__author">
        Created by:
        <a href="https://github.com/manuelmtzv" target="_blank"
          >Manuel Martínez</a
        >
      </p>

      <p></p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Footer',
})
</script>

<style scoped lang="css">
.footer {
  @apply py-8 border border-t;
}
.footer__author {
  @apply font-semibold;
}
.footer__author > a {
  @apply font-normal;
}
</style>
