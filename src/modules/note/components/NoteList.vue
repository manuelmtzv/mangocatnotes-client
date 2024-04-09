<script setup lang="ts">
import Loading from "vue-loading-overlay";
import useNotes from "@/modules/note/composables/useNotes";
import NoteEntry from "./NoteEntry.vue";
import { computed } from "vue";

const { sortedByTime, isLoading, isRefetching } = useNotes();

const loading = computed(() => isLoading.value || isRefetching.value);
</script>

<template>
  <div class="list">
    <h2 class="list__title">Notes:</h2>

    <section
      class="list__container"
      v-if="sortedByTime.length > 0 && !isLoading"
    >
      <NoteEntry v-for="note in sortedByTime" :key="note.id" :note="note" />
    </section>

    <template v-else>
      <p v-if="isLoading">Loading notes...</p>
      <p v-else>No notes to show</p>
    </template>

    <Loading v-model:active="loading" />
  </div>
</template>

<style scoped lang="css">
.list {
  @apply flex flex-col gap-2 w-full;
}
.list__title {
  @apply text-lg font-semibold;
}
.list__container {
  @apply grid auto-cols-min grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4;
}
</style>
