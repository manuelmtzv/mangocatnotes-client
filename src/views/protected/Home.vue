<script setup lang="ts">
import NoteForm from '@/components/NoteForm.vue'
import NoteList from '@/components/NoteList.vue'
import useNotes from '@/composables/notes/useNotes'

const { notesQuery } = useNotes()
</script>

<template>
  <div class="py-6 mb-4">
    <!-- Note form -->
    <NoteForm />

    <!-- Note list -->
    <NoteList />

    <pre>{{ notesQuery.data }}</pre>
  </div>
</template>
