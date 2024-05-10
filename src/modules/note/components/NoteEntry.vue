<script setup lang="ts">
import { ref } from "vue";
import { cutString } from "@/shared/utils/cutString";
import type { INote } from "@/modules/note/interfaces/INote";
import NoteDeleteButton from "@/modules/note/components/NoteDeleteButton.vue";

interface IProps {
  note: INote;
}

defineProps<IProps>();

const deletingNote = ref<boolean>(false);
const showDeleteButton = ref<boolean>(false);
</script>

<template>
  <router-link
    :class="['note-entry', deletingNote && 'note-entry--deleting']"
    :to="{ name: 'note-detail', params: { id: note.id } }"
    :key="note.id"
    @mouseover="showDeleteButton = true"
    @mouseleave="showDeleteButton = false"
  >
    <div>
      <h3 class="note-entry__title" v-if="note.title">
        {{ cutString(note.title, 50) }}
      </h3>
      <p class="note-entry__description">{{ cutString(note.content, 75) }}</p>
    </div>

    <NoteDeleteButton
      v-if="showDeleteButton"
      :note-id="note.id"
      container-class="delete-button hidden sm:inline-flex"
      :show="showDeleteButton"
      :on-deleting-change="
        (deleting: boolean) => {
          deletingNote = deleting;
          showDeleteButton = deleting;
        }
      "
    />
  </router-link>
</template>

<style lang="css">
.note-entry {
  @apply flex flex-col min-h-[8rem] md:min-h-[12rem] gap-2 p-4 rounded-md border bg-entry-default hover:bg-gray-100 transition-colors duration-300 relative;
}
.note-entry__title {
  @apply font-semibold overflow-hidden;
}
.note-entry__description {
  @apply overflow-hidden;
}
</style>
