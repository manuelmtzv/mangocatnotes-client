<script setup lang="ts">
import LoadingSpin from "@shared/components/LoadingSpin.vue";

interface Props {
  label?: string;
  loading?: boolean;
}

defineProps<Props>();
</script>

<template>
  <button class="button">
    <p v-if="label">{{ label }}</p>

    <template v-else>
      <slot v-if="!loading" />

      <LoadingSpin :when="loading" class="!h-4 !w-4" />
    </template>
  </button>
</template>

<style scoped>
.button {
  @apply flex items-center gap-2 p-2 h-fit rounded-md border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-300;
}
</style>
