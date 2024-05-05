<script setup lang="ts">
import Loading from "vue-loading-overlay";
import useNotes from "@/modules/note/composables/useNotes";
import NoteEntry from "./NoteEntry.vue";
import { computed } from "vue";
import { useNotePaginationStore } from "@/modules/note/stores/notePaginationStore";
import { storeToRefs } from "pinia";

const { sortedByTime: renderingNotes, isLoading } = useNotes();
const { isLoading: loadingPagination } = storeToRefs(useNotePaginationStore());

const loading = computed(() => isLoading.value || loadingPagination.value);
</script>

<template>
  <div class="list">
    <div class="flex items-center justify-between">
      <h2
        :class="['list__title']"
        v-if="renderingNotes.length > 0 && !isLoading"
      >
        Showing:
        <p class="font-normal">{{ renderingNotes.length }} notes</p>
      </h2>

      <p v-else>No notes to show</p>

      <slot name="actions" />
    </div>

    <section class="list__container">
      <NoteEntry v-for="note in renderingNotes" :key="note.id" :note="note" />
    </section>

    <p v-if="isLoading">Loading notes...</p>

    <Loading v-model:active="loading" />
  </div>

  <slot name="footer" />
</template>

<style scoped lang="css">
.list {
  @apply flex flex-col gap-4 w-full;
}
.list__title {
  @apply text-lg font-semibold inline-flex gap-1.5;
}
.list__container {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4;
}
</style>
