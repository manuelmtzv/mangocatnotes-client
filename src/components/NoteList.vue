<script setup lang="ts">
import useNotes from '@/composables/notes/useNotes'
import NoteEntry from './NoteEntry.vue'
import Loading from 'vue-loading-overlay'

const { sortedByTime, isLoading } = useNotes()
</script>

<template>
  <div class="list">
    <h2 class="list__title">Notes:</h2>

    <section class="list__container" v-if="sortedByTime.length > 0">
      <router-link
        class="note-entry"
        v-for="note in sortedByTime"
        :to="`/note/${note._id}`"
        :key="note._id"
      >
        <NoteEntry :note="note" />
      </router-link>
    </section>

    <p v-else>No notes to show</p>

    <Loading v-model:active="isLoading" />
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
  @apply grid auto-cols-min grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4;
}
.note-entry {
  @apply flex flex-col gap-2 p-4 rounded-md border bg-entry-default hover:bg-gray-100 transition-colors duration-300;
}
</style>
../stores/noteStore.js
