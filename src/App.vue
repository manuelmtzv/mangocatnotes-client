<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useNoteStore } from '@/stores/NoteStore'

export default defineComponent({
  name: 'App',
  setup() {
    const noteStore = useNoteStore()

    onMounted(() => {
      noteStore.getNotes()
    })
  },
})
</script>
./stores/noteStore
