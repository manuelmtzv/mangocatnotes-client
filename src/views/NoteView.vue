<template>
  <div class="py-6 mb-4">
    <h2 class="text-xl font-semibold mb-4">Note View</h2>

    <!-- Edit form -->
    <NoteEfitForm :noteId="noteId" />
  </div>
</template>

<script lang="ts">
import NoteEfitForm from '../components/NoteEditForm.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

export default {
  name: 'NoteView',
  components: { NoteEfitForm },
  setup() {
    const route = useRoute()
    const noteId = ref(route.params.id as string)

    return {
      noteId,
    }
  },
}
</script>
