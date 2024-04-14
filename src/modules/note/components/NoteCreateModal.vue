<script setup lang="ts">
import Modal from "@shared/components/modal/Modal.vue";
import NoteForm from "@modules/note/components/NoteForm.vue";

import { ref } from "vue";
import ButtonComponent from "@/shared/components/form/ButtonComponent.vue";

const isOpen = ref(false);

const closeModal = () => {
  isOpen.value = false;
};
</script>

<template>
  <ButtonComponent
    class="button submit flex items-center gap-2"
    @click="isOpen = true"
    >Add new note</ButtonComponent
  >

  <Modal panel-class="max-w-xl" :is-open="isOpen" :close-modal="closeModal">
    <template #body>
      <NoteForm :after-create-note="() => (isOpen = false)" />
    </template>
  </Modal>
</template>

<style scoped></style>
