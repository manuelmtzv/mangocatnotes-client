<script setup lang="ts">
import { ref, watch } from "vue";
import ListTransitionWrapper from "@/shared/components/animations/ListTransitionWrapper.vue";
import { ITag } from "@/modules/tags/interfaces/ITag";
import TagsEditModal from "@/modules/tags/components/TagEditModal.vue";
import TagPillEntry from "@/modules/tags/components/TagPillEntry.vue";

type TagListProps = {
  tags: ITag[];
};

defineProps<TagListProps>();
const selectedTag = ref<ITag | undefined>(undefined);
const editingModal = ref(false);

function handleTagSelection(tag: ITag) {
  selectedTag.value = tag;
}

function setEditingModal(value: boolean) {
  editingModal.value = value;
}

function isSelected(tag: ITag) {
  return selectedTag.value?.id === tag.id;
}

watch(selectedTag, (value) => {
  editingModal.value = !!value;
});
</script>

<template>
  <ListTransitionWrapper
    class="v-collapse flex gap-2 flex-wrap justify-around w-full"
  >
    <TagPillEntry
      v-for="tag in tags"
      :key="tag.id"
      class-name="text-base px-4 py-2"
      :tag="tag.name"
      :selected="isSelected(tag)"
      :color="tag.color"
      @click="handleTagSelection(tag)"
    />
  </ListTransitionWrapper>

  <TagsEditModal
    v-if="selectedTag"
    :tag="selectedTag"
    v-model:isOpen="editingModal"
    @close-modal="setEditingModal(false)"
  />
</template>

<style scoped></style>
