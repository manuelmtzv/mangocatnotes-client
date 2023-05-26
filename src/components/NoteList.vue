<template>
  <div class="list">
    <h2 class="list__title">Notes:</h2>

    <section class="list__container" v-if="noteStore.notes.length > 0">
      <router-link
        class="note-entry"
        v-for="note in noteStore.notes"
        :to="`/note/${note.id}`"
      >
        <h3 class="note-entry__title" v-if="note.title">
          {{ cutString(note.title, 50) }}
        </h3>
        <p>{{ cutString(note.content, 200) }}</p>
      </router-link>
    </section>

    <p v-else>No notes to show</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useNoteStore } from '../stores/NoteStore.js'
import { useCutString } from '../utils/useCutString'

export default defineComponent({
  name: 'NoteList',
  setup() {
    const noteStore = useNoteStore()
    const { cutString } = useCutString()

    return {
      noteStore,
      cutString,
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
  @apply flex flex-col gap-2 p-4 rounded-md border;
}
.note-entry__title {
  @apply font-semibold;
}
</style>
