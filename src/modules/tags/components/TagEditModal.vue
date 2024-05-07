<script setup lang="ts">
import { ref, watch } from "vue";
import Modal from "@/shared/components/modal/Modal.vue";
import TagEditForm from "@/modules/tags/components/TagEditForm.vue";
import { ITag } from "@/modules/tags/interfaces/ITag";

type TagEditModalProps = {
  tag: ITag;
};

type TagEditModalEmits = {
  (event: "close-modal"): void;
};

const isOpen = ref(false);
const emit = defineEmits<TagEditModalEmits>();

const closeModal = () => {
  isOpen.value = false;
};

const setModal = (value: boolean) => {
  isOpen.value = value;
};

watch(isOpen, (value) => {
  if (!value) {
    emit("close-modal");
  }
});

defineProps<TagEditModalProps>();
</script>

<template>
  <div>
    <button @click="() => setModal(true)">
      <slot />
    </button>

    <Modal
      panel-class="w-full max-w-md p-2"
      :is-open="isOpen"
      :close-modal="closeModal"
    >
      <template #body>
        <TagEditForm :tag="tag" @edited="closeModal" />
      </template>
    </Modal>
  </div>
</template>

<style scoped></style>
