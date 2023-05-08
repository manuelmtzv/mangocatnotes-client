<template>
  <div>
    <h1>Mangocat-notes app</h1>

    <NoteForm />

    <Notes />
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
