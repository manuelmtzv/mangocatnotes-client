<script setup lang="ts">
import { computed, ref } from "vue";
import useAuth from "@/composables/auth/useAuth";
import { useWindowSize } from "@vueuse/core";
import MobileSidebar from "@/components/general/MobileSidebar.vue";

const { username, logout } = useAuth();
const { width } = useWindowSize();

const isMobile = computed(() => width.value < 640);
const mobileSidebar = ref(false);
</script>

<template>
  <header class="header">
    <div class="content header__container">
      <RouterLink :to="{ name: 'home' }" class="header__logo">
        <picture>
          <source srcset="@/assets/imgs/webp/mangocat.webp" type="image/webp" />
          <img
            class="header__icon"
            src="@/assets/imgs/png/mangocat.png"
            alt="MangoCatNotes Logo"
          />
        </picture>
        <h1 class="header__title">MangoCatNotes</h1>
      </RouterLink>

      <div v-if="!isMobile" class="header__actions">
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

      <button v-else @click="mobileSidebar = !mobileSidebar">
        <span
          :class="[
            'material-symbols-outlined text-[26px]',
            mobileSidebar && 'invisible',
          ]"
        >
          menu
        </span>
      </button>

      <MobileSidebar
        :username="username"
        :logout="logout"
        v-model:when="mobileSidebar"
        :class="[width > 640 && 'hidden']"
      />
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
