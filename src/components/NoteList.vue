<template>
  <div class="list">
    <h2 class="list__title">Notes:</h2>

    <section class="list__container" v-if="sortedByTime.length > 0">
      <router-link
        class="note-entry"
        v-for="note in sortedByTime"
        :to="`/note/${note.id}`"
        :key="note.id"
      >
        <NoteEntry :note="note" />
      </router-link>
    </section>

    <p v-else>No notes to show</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useNoteStore } from '../stores/NoteStore.js'
import NoteEntry from './NoteEntry.vue'

export default defineComponent({
  name: 'NoteList',
  components: { NoteEntry },
  setup() {
    const noteStore = useNoteStore()

    const sortedByTime = computed(() => noteStore.sortedByTime)

    return {
      sortedByTime,
    }
  },
})
</script>

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
  @apply flex flex-col gap-2 p-4 rounded-md border hover:bg-gray-100 transition-colors duration-300;
}
</style>
