<script setup lang="ts">
import Loading from "vue-loading-overlay";
import useNotes from "@/modules/note/composables/useNotes";
import NoteEntry from "./NoteEntry.vue";
import { computed } from "vue";
import { useNotePaginationStore } from "@/modules/note/stores/notePaginationStore";
import { storeToRefs } from "pinia";

const { sortedByTime, isLoading } = useNotes();
const { isLoading: loadingPagination } = storeToRefs(useNotePaginationStore());

const loading = computed(() => isLoading.value || loadingPagination.value);
</script>

<template>
  <div class="list">
    <template v-if="sortedByTime.length > 0 && !isLoading">
      <div class="flex justify-between">
        <h2 :class="['list__title']">
          Showing:
          <p class="font-normal">{{ sortedByTime.length }} notes</p>
        </h2>

        <slot name="actions" />
      </div>

      <section class="list__container">
        <NoteEntry v-for="note in sortedByTime" :key="note.id" :note="note" />
      </section>
    </template>

    <template v-else>
      <p v-if="isLoading">Loading notes...</p>
      <p v-else>No notes to show</p>
    </template>

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
  @apply grid auto-cols-min grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4;
}
</style>
