<template>
  <div>
    <!-- Note form -->
    <NoteForm />

    <!-- <Notes /> -->
  </div>
</template>

<script lang="ts">
import NoteForm from '../components/NoteForm.vue'
import Notes from '../components/Notes.vue'

export default {
  name: 'Home',
  components: { NoteForm, Notes },
  setup() {},
}
</script>
