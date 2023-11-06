<script setup lang="ts">
import { INote } from '../interfaces/INote'
import { useRouter } from 'vue-router'
import { useNoteStore } from '@/stores/noteStore'
import useNote from '@/composables/notes/useNote'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

interface IProps {
  noteId: string
}

const props = defineProps<IProps>()
const route = useRoute()
const { noteQuery } = useNote({ id: route.params.id as string })
const noteStore = useNoteStore()
const note = ref<INote>()
const router = useRouter()

// Edit form refs
const title = ref<string>('')
const content = ref<string>('')
const contentIsEmpty = ref<boolean>(false)
const editMode = ref<boolean>(false)

// Last updated
const date = ref<string>('')
const time = ref<string>('')

// Load note onMounted
onMounted(() => {
  note.value = noteQuery.data.value?.data
  if (note.value?.content) {
    title.value = note.value.title || ''
    content.value = note.value.content
  } else {
    router.push('/404')
  }

  if (note.value?.updatedAt) {
    date.value = new Date(note.value.updatedAt).toLocaleDateString()
    time.value = new Date(note.value.updatedAt).toLocaleTimeString()
  }
})

function setEditMode(value: boolean) {
  editMode.value = value
}

// Edit note handler
function handleEdit() {
  if (content.value != '') {
    noteStore.updateNote(props.noteId, title.value, content.value)
    resetValues()
  } else {
    contentIsEmpty.value = true
  }
}

// Delete note handler
function handleDelete() {
  noteStore.deleteNote(props.noteId)
  router.push('/')
}

// Reset values handler
function resetValues() {
  setEditMode(false)
  contentIsEmpty.value = false
}
</script>

<template>
  <section class="flex flex-col gap-5">
    <form class="form w-full !max-w-none">
      <label class="label">
        <span>Title:</span>
        <input
          name="title"
          class="input"
          type="text"
          v-model="title"
          placeholder="Learnings..."
          @input.prevent="() => setEditMode(true)"
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
          @input.prevent="() => setEditMode(true)"
        ></textarea>
        <span v-if="contentIsEmpty" class="error"
          >The content field is required!</span
        >
      </label>
    </form>

    <p><span class="important">Last updated:</span> {{ date }} | {{ time }}</p>

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
  </section>
</template>

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
../stores/noteStore
