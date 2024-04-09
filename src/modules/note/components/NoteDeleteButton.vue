<script setup lang="ts">
import { ref, watch } from "vue";
import ButtonComponent from "@shared/components/form/ButtonComponent.vue";
import TransitionWrapper from "@shared/components/TransitionWrapper.vue";
import DeleteModal from "@shared/components/modal/DeleteModal.vue";
import useNoteMutation from "@/modules/note/composables/useNoteMutation";
import { useToast } from "vue-toast-notification";

export interface NoteDeleteButtonProps {
  noteId: string;
  show: boolean;
  onDeletingChange?: (value: boolean) => void;
}

const deleting = ref(false);
const props = defineProps<NoteDeleteButtonProps>();
const toast = useToast();
const { deleteNoteAsync, deleteNoteMutation } = useNoteMutation();

const showModal = ref(false);

const handleDelete = async () => {
  try {
    await deleteNoteAsync(props.noteId);
    toast.success("Note deleted successfully");
  } catch (error) {
    toast.error("Error deleting note");
  }
};

const openModal = () => {
  showModal.value = true;
  deleting.value = true;
};

const closeModal = () => {
  showModal.value = false;
  deleting.value = false;
};

watch(deleting, (value) => {
  if (props.onDeletingChange) {
    props.onDeletingChange(value);
  }
});
</script>

<template>
  <TransitionWrapper>
    <VTooltip class="delete-button hidden sm:inline-flex">
      <ButtonComponent
        v-show="show || deleting"
        :loading="deleteNoteMutation.isLoading.value || deleting"
        class="inline-flex !p-1"
        @click.prevent="openModal"
      >
        <template #default>
          <span class="material-symbols-outlined text-[22px]"> delete </span>
        </template>
      </ButtonComponent>

      <template #popper> Delete note </template>
    </VTooltip>
  </TransitionWrapper>

  <DeleteModal
    :is-open="showModal"
    :close-modal="closeModal"
    :on-confirm="handleDelete"
    title="Delete Note"
    message="Are you sure you want to delete this note?"
  />
</template>

<style scoped></style>
