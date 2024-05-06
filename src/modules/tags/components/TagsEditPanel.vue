<script setup lang="ts">
import { ref } from "vue";
import { useTags } from "@/modules/tags/composables/useTags";
import TagPillEntry from "@/modules/tags/components/TagPillEntry.vue";
import TagEditForm from "@/modules/tags/components/TagEditForm.vue";
import { ITag } from "@/modules/tags/interfaces/ITag";

const { tags } = useTags();
const selectedTag = ref<ITag | null>(null);

function handleTagSelection(tag: ITag) {
  selectedTag.value = tag;
}

function handleTagDeselection(tag: ITag) {
  if (selectedTag.value?.id == tag.id) {
    selectedTag.value = null;
  }
}

function isSelected(tag: ITag) {
  return selectedTag.value?.id === tag.id;
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2 class="font-semibold text-lg">Tags Administration Panel</h2>

    <div class="flex gap-2 flex-wrap">
      <VDropdown
        v-for="tag in tags"
        :key="tag.id"
        @hide="handleTagDeselection(tag)"
        @auto-hide="handleTagDeselection(tag)"
      >
        <TagPillEntry
          :class-name="`text-base`"
          :tag="tag.name"
          :selected="isSelected(tag)"
          :color="tag.color"
          @click="handleTagSelection(tag)"
        />

        <template #popper>
          <TagEditForm :tag="tag" />
        </template>
      </VDropdown>
    </div>
  </div>
</template>

<style scoped></style>
