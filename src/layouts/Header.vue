<template>
  <header class="header">
    <div class="content header__container">
      <figure class="header__logo">
        <img class="header__icon" src="/gatito.png" alt="MangoCatNotes Logo" />
        <h1 class="header__title">MangoCatNotes</h1>
      </figure>

      <div class="header__actions">
        <template v-if="!user">
          <RouterLink to="" class="btn btn-primary">Sign In</RouterLink>
          <RouterLink to="" class="btn btn-primary">Log In</RouterLink>
        </template>

        <template v-else>
          <button class="btn btn-primary">Sign Out</button>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';

const { user } = storeToRefs(useAuthStore());
</script>

<style scoped lang="css">
.header {
  @apply bg-header-default py-6 shadow-md;
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
.header__actions {
  @apply flex gap-4 items-center
}
</style>
