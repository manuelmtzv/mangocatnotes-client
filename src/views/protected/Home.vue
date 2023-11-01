<template>
  <div class="py-6 mb-4">
    <!-- Note form -->
    <NoteForm />

    <!-- Note list -->
    <NoteList />
  </div>
</template>

<script lang="ts">
import NoteForm from '@/components/NoteForm.vue'
import NoteList from '@/components/NoteList.vue'

export default {
  name: 'Home',
  components: { NoteForm, NoteList },
  setup() {},
}
</script>
