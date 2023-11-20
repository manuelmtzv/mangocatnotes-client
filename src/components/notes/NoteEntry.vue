<script setup lang="ts">
import { ref } from "vue";
import { useCutString } from "@/utils/useCutString";
import { useToast } from "vue-toast-notification";
import ButtonComponent from "@/components/form/ButtonComponent.vue";
import TransitionWrapper from "@/components/general/TransitionWrapper.vue";
import useNoteMutation from "@/composables/notes/useNoteMutation";
import type { INote } from "@/interfaces/INote";

interface IProps {
  note: INote;
}

const props = defineProps<IProps>();
const { cutString } = useCutString();
const showDeleteButton = ref<boolean>(false);
const { deleteNoteAsync, deleteNoteMutation } = useNoteMutation();
const toast = useToast();

const handleDelete = async () => {
  try {
    await deleteNoteAsync(props.note._id);
    toast.success("Note deleted successfully");
  } catch (error) {
    toast.error("Error deleting note");
  }
};
</script>

<template>
  <router-link
    class="note-entry"
    :to="`/note/${note._id}`"
    :key="note._id"
    @mouseover="showDeleteButton = true"
    @mouseleave="showDeleteButton = false"
  >
    <div>
      <h3 class="note-entry__title" v-if="note.title">
        {{ cutString(note.title, 50) }}
      </h3>
      <p class="note-entry__description">{{ cutString(note.content, 200) }}</p>
    </div>

    <TransitionWrapper>
      <VTooltip class="delete-button hidden sm:inline-flex">
        <ButtonComponent
          v-show="showDeleteButton"
          :loading="deleteNoteMutation.isLoading.value"
          class="leading-none !p-1"
          @click.prevent="handleDelete"
        >
          <template #default>
            <span class="material-symbols-outlined text-[22px]"> delete </span>
          </template>
        </ButtonComponent>

        <template #popper> Delete note </template>
      </VTooltip>
    </TransitionWrapper>
  </router-link>
</template>

<style scoped lang="css">
.note-entry {
  @apply flex flex-col gap-2 p-4 rounded-md border bg-entry-default hover:bg-gray-100 transition-colors duration-300 relative;
}
.note-entry__title {
  @apply font-semibold overflow-hidden;
}
.note-entry__description {
  @apply overflow-hidden;
}
.delete-button {
  @apply justify-center items-center absolute top-2 right-2;
}
</style>
