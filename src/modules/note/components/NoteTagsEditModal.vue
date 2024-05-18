<script setup lang="ts">
import { ref } from "vue";
import Modal from "@/shared/components/modal/Modal.vue";
import NoteTagsEditForm from "@/modules/note/components/NoteTagsEditForm.vue";
import { INote } from "@/modules/note/interfaces/INote";
import ButtonComponent from "@/shared/components/form/ButtonComponent.vue";

type NoteTagsEditModalProps = {
  note: INote;
};

defineProps<NoteTagsEditModalProps>();
const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};
</script>

<template>
  <ButtonComponent @click="openModal" class="border-gray-800 py-1"
    >Edit tags</ButtonComponent
  >

  <Modal :is-open="isOpen" :close-modal="closeModal">
    <template #body>
      <NoteTagsEditForm :note="note" @save="closeModal" @cancel="closeModal" />
    </template>
  </Modal>
</template>

<style scoped></style>
