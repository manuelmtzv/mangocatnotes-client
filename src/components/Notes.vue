<template>
  <h2>Notes Component</h2>

  <p>{{ noteStore.notes }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useNoteStore } from '../stores/NoteStore'

export default defineComponent({
  name: 'Notes',
  setup() {
    const noteStore = useNoteStore()

    return {
      noteStore,
    }
  },
})
</script>
