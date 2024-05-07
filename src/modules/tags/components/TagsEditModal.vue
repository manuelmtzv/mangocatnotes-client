<script setup lang="ts">
import { ref } from "vue";
import Modal from "@/shared/components/modal/Modal.vue";
import TagsEditPanel from "@/modules/tags/components/TagsPanel.vue";
import ButtonComponent from "@/shared/components/form/ButtonComponent.vue";

const isOpen = ref(false);

const closeModal = () => {
  isOpen.value = false;
};

const setModal = (value: boolean) => {
  isOpen.value = value;
};
</script>

<template>
  <ButtonComponent
    class="button submit flex items-center gap-2"
    @click="isOpen = true"
  >
    Edit tags
  </ButtonComponent>

  <Modal
    panel-class="max-w-3xl p-6"
    :is-open="isOpen"
    :close-modal="closeModal"
  >
    <template #body>
      <TagsEditPanel :set-modal="setModal" />
    </template>
  </Modal>
</template>

<style scoped></style>
