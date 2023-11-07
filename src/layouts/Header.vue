<script setup lang="ts">
import useAuth from '@/composables/auth/useAuth'

const { username, logout } = useAuth()
</script>

<template>
  <header class="header">
    <div class="content header__container">
      <RouterLink :to="{ name: 'home' }" class="header__logo">
        <img
          class="header__icon"
          src="@/assets/imgs/gatito.png"
          alt="MangoCatNotes Logo"
        />
        <h1 class="header__title">MangoCatNotes</h1>
      </RouterLink>

      <div class="header__actions">
        <template v-if="!username">
          <RouterLink :to="{ name: 'register' }" class="btn btn-primary"
            >Sign In</RouterLink
          >
          <RouterLink :to="{ name: 'login' }" class="btn btn-primary"
            >Log In</RouterLink
          >
        </template>

        <template v-else>
          <p>{{ username }}</p>
          <span>|</span>
          <button class="btn btn-primary" @click="logout">Sign Out</button>
        </template>
      </div>
    </div>
  </header>
</template>

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
  @apply hidden gap-4 items-center sm:flex;
}
</style>
@/composables/auth/useAuth
