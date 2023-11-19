<script setup lang="ts">
import { ref } from "vue";
import { useNoteStore } from "@/stores/noteStore";
import useNoteMutation from "@/composables/notes/useNoteMutation";
import { useToast } from "vue-toast-notification";
import LoadingSpin from "../general/LoadingSpin.vue";

const noteStore = useNoteStore();
const { createNoteAsync, createNoteMutation } = useNoteMutation();
const title = ref<string>("");
const content = ref<string>("");
const contentIsEmpty = ref<boolean>(false);

async function handleSubmit() {
  if (content.value != "") {
    try {
      const newNote = await createNoteAsync({
        title: title.value,
        content: content.value,
      });
      noteStore.addNote(newNote.data);
      resetValues();
      useToast().success("Note created successfully!");
    } catch (err) {
      useToast().error("Something went wrong! Please try again.");
    }
  } else {
    contentIsEmpty.value = true;
  }
}

function resetValues(): void {
  title.value = content.value = "";
  contentIsEmpty.value = false;
}
</script>

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
      <p>Content <span v-tooltip="'Required'" class="text-red-500">*</span></p>
      <textarea
        class="input"
        type="text"
        name="content"
        v-model="content"
        placeholder="Today I learned..."
      ></textarea>
      <span v-if="contentIsEmpty" class="error"
        >The content field is required!</span
      >
    </label>

    <button class="button submit flex items-center gap-2" type="submit">
      <span>Save</span>

      <LoadingSpin
        :when="createNoteMutation.isLoading.value"
        class="!h-4 !w-4"
      />
    </button>
  </form>
</template>

<style scoped lang="css">
.form__title {
  @apply text-2xl font-semibold mb-2;
}
</style>
