<template>
  <header class="header">
    <div class="content header__container">
      <figure class="header__logo">
        <img class="header__icon" src="/gatito.png" alt="MangoCatNotes Logo" />
        <h1 class="header__title">MangoCatNotes</h1>
      </figure>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Header',
})
</script>

<style scoped lang="css">
.header {
  @apply bg-gray-300 py-6;
}
.header__container {
  @apply flex gap-4 items-center justify-between;
}
.header__logo {
  @apply flex gap-4 items-center;
}
.header__icon {
  @apply w-[3rem] sm:w-[4rem];
}
.header__title {
  @apply font-bold text-[1.5rem] [line-height:2.25rem] sm:text-3xl;
}
</style>
