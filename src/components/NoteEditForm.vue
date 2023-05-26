<template>
  <form class="form !max-w-none">
    <label class="label">
      <span>Title:</span>
      <input
        name="title"
        class="input"
        type="text"
        v-model="title"
        placeholder="Learnings..."
      />
    </label>
    <label class="label">
      <span>Content:</span>
      <textarea
        class="input !font-normal"
        name="content"
        placeholder="Today I learned that..."
        v-model="content"
        ref="contentTextareaRef"
        @input="adjustTextareaHeight"
        @keydown.enter.prevent
      ></textarea>
    </label>
  </form>
</template>

<script lang="ts">
import { INote } from '../interfaces/INote'
import { useNoteStore } from '../stores/NoteStore'
import { ref, onMounted, nextTick } from 'vue'

export default {
  name: 'NoteEditForm',
  props: {
    noteId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const noteStore = useNoteStore()
    const note = ref<INote>()

    // Edit form refs
    const isEditing = ref<boolean>(false)
    const title = ref<string>('')
    const content = ref<string>('')

    const contentTextareaRef = ref<HTMLTextAreaElement | null>(null)

    // Load note onMounted
    onMounted(() => {
      note.value = noteStore.getNoteById(props.noteId)
      if (note.value?.content) {
        title.value = note.value.title || ''
        content.value = note.value.content
      }
      nextTick(() => {
        adjustTextareaHeight()
      })
    })

    function adjustTextareaHeight() {
      const textarea = contentTextareaRef.value
      console.log(textarea)
      if (textarea) {
        textarea.style.height = 'auto'
        textarea.style.height = textarea.scrollHeight + 20 + 'px'
        console.log(textarea.style.height)
      }
    }

    return {
      isEditing,
      title,
      content,
      contentTextareaRef,
      adjustTextareaHeight,
    }
  },
}
</script>
