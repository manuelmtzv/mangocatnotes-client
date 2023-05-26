<template>
  <form class="form" @submit.prevent="handleSubmit">
    <h2 class="form__title">Create new Note</h2>

    <label class="label">
      <span>Title</span>
      <input
        class="input"
        type="text"
        name="title"
        v-model="title"
        placeholder="Learnings..."
      />
    </label>
    <label class="label">
      <span>Content</span>
      <textarea
        class="input"
        type="text"
        name="content"
        v-model="content"
        placeholder="Today I learned..."
      ></textarea>
    </label>

    <button class="button submit" type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Note } from '../classes/Note'
import { useNoteStore } from '../stores/NoteStore'

export default defineComponent({
  name: 'NoteForm',
  setup() {
    const noteStore = useNoteStore()
    const title = ref<string>('')
    const content = ref<string>('')

    function handleSubmit() {
      const newNote = new Note(title.value, content.value)
      resetValues()

      noteStore.addNote(newNote)
      console.log(newNote)
    }

    function resetValues(): void {
      title.value = content.value = ''
    }

    return {
      handleSubmit,
      title,
      content,
    }
  },
})
</script>

<style scoped lang="css">
.form__title {
  @apply text-2xl font-semibold mb-2;
}
</style>
