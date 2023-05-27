<template>
  <form class="form !max-w-none mb-10">
    <label class="label">
      <span>Title:</span>
      <input
        name="title"
        class="input"
        type="text"
        v-model="title"
        placeholder="Learnings..."
        @input.prevent="setEditMode"
      />
    </label>
    <label class="label">
      <span>Content:</span>
      <textarea
        class="input !font-normal !min-h-[25rem]"
        name="content"
        placeholder="Today I learned that..."
        v-model="content"
        ref="contentTextareaRef"
        @input.prevent="setEditMode"
      ></textarea>
      <span v-if="contentIsEmpty" class="error"
        >The content field is required!</span
      >
    </label>
  </form>

  <nav class="actions">
    <button class="button navigation" @click.prevent="() => router.push('/')">
      Return
    </button>

    <div class="actions__notes">
      <button class="button actions__delete" @click.prevent="handleDelete">
        Delete
      </button>

      <button
        class="button actions__edit"
        :class="{ disabled: !editMode }"
        @click.prevent="handleEdit"
        :disabled="!editMode"
      >
        Edit
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { INote } from '../interfaces/INote'
import { useRouter } from 'vue-router'
import { useNoteStore } from '../stores/NoteStore'
import { ref, onMounted } from 'vue'

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
    const router = useRouter()

    // Edit form refs
    const title = ref<string>('')
    const content = ref<string>('')
    const contentIsEmpty = ref<boolean>(false)
    const editMode = ref<boolean>(false)

    // Load note onMounted
    onMounted(() => {
      note.value = noteStore.getNoteById(props.noteId)
      if (note.value?.content) {
        title.value = note.value.title || ''
        content.value = note.value.content
      } else {
        router.push('/404')
      }
    })

    function setEditMode() {
      editMode.value = true
    }

    // Edit note handler
    function handleEdit() {
      if (content.value != '') {
        noteStore.updateNote(props.noteId, title.value, content.value)
        router.push('/')
      } else {
        contentIsEmpty.value = true
      }
    }

    // Delete note handler
    function handleDelete() {
      noteStore.deleteNote(props.noteId)
      router.push('/')
    }

    return {
      router,
      title,
      content,
      contentIsEmpty,
      editMode,
      setEditMode,
      handleEdit,
      handleDelete,
    }
  },
}
</script>

<style scoped lang="css">
.actions {
  @apply flex items-center justify-between;
}
.actions__notes {
  @apply flex items-center gap-2;
}
.actions__delete {
  @apply bg-delete-default hover:bg-delete-hover;
}
.actions__edit {
  @apply bg-edit-default hover:bg-edit-hover;
}

.disabled {
  @apply text-gray-400 !bg-transparent hover:!bg-transparent;
}
</style>
