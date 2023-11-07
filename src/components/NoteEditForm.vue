<script setup lang="ts">
import { ref, onMounted } from "vue";
import { INote } from "../interfaces/INote";
import { useRouter } from "vue-router";
import useNoteMutation from "@/composables/notes/useNoteMutation";

interface IProps {
  note: INote;
}

const props = defineProps<IProps>();
const noteId = props.note._id;
const { editNoteAsync, deleteNoteAsync } = useNoteMutation();
const router = useRouter();

// Edit form refs
const title = ref<string>(props.note.title || "");
const content = ref<string>(props.note.content);
const contentIsEmpty = ref<boolean>(props.note.content == "");
const editMode = ref<boolean>(false);

// Last updated
const date = ref<string>("");
const time = ref<string>("");

// Edit note handler
async function handleEdit() {
  if (content.value != "") {
    await editNoteAsync({
      _id: noteId,
      title: title.value,
      content: content.value,
    });
    resetValues();
  } else {
    contentIsEmpty.value = true;
  }
}

// Delete note handler
async function handleDelete() {
  await deleteNoteAsync(noteId);
  router.push({ name: "home" });
}

function setEditMode(value: boolean) {
  editMode.value = value;
}

// Reset values handler
function resetValues() {
  setEditMode(false);
  contentIsEmpty.value = false;
}

onMounted(async () => {
  if (props.note.content) {
    title.value = props.note.title || "";
    content.value = props.note.content;
  } else {
    router.push("/404");
  }

  if (props.note?.updatedAt) {
    date.value = new Date(props.note.updatedAt).toLocaleDateString();
    time.value = new Date(props.note.updatedAt).toLocaleTimeString();
  }
});
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
      <RouterLink :to="{ path: '/home' }" class="button navigation">
        Return
      </RouterLink>

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
