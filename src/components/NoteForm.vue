<template>
  <form class="form" @submit.prevent="handleSubmit">
    <h2 class="form__title">Create new Note</h2>

    <label class="label">
      <input
        class="input"
        type="text"
        name="title"
        v-model="title"
        placeholder="Learnings..."
      />
    </label>
    <label class="label">
      <input
        class="input"
        type="text"
        name="title"
        v-model="content"
        placeholder="Today I learned..."
      />
    </label>

    <button class="button submit" type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Note } from '../classes/Note'

export default defineComponent({
  name: 'NoteForm',
  setup() {
    const title = ref<string>('')
    const content = ref<string>('')

    function handleSubmit() {
      const newNote = new Note(title.value, content.value)

      console.log(newNote)
    }

    return {
      handleSubmit,
      title,
      content,
    }
  },
})
</script>

<style scoped lang="css"></style>
