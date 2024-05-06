<script setup lang="ts">
import { ref } from "vue";
import { useTags } from "@/modules/tags/composables/useTags";
import TagPillEntry from "@/modules/tags/components/TagPillEntry.vue";
import TagEditForm from "@/modules/tags/components/TagEditForm.vue";
import { ITag } from "@/modules/tags/interfaces/ITag";
import ButtonComponent from "@/shared/components/form/ButtonComponent.vue";
import { Collapse } from "vue-collapsed";

type TagsEditPanelProps = {
  setModal?: (value: boolean) => void;
};

defineProps<TagsEditPanelProps>();
const { tags, isLoading } = useTags();
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
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h2 class="font-semibold text-lg">Tags Administration Panel</h2>

        <p class="text-sm text-gray-800">
          Select a tag to edit its name or color.
        </p>
      </div>

      <span v-if="!isLoading && tags.length">
        {{ `${tags.length} tags found` }}
      </span>
    </div>

    <Collapse :when="true" class="v-collapse flex gap-2 flex-wrap">
      <VDropdown
        v-for="tag in tags"
        :key="tag.id"
        @hide="handleTagDeselection(tag)"
        @auto-hide="handleTagDeselection(tag)"
      >
        <TagPillEntry
          class-name="text-base px-4 py-2"
          :tag="tag.name"
          :selected="isSelected(tag)"
          :color="tag.color"
          @click="handleTagSelection(tag)"
        />

        <template #popper>
          <TagEditForm :tag="tag" />
        </template>
      </VDropdown>
    </Collapse>

    <p v-if="isLoading" class="text-sm text-gray-800">Loading...</p>

    <ButtonComponent
      v-if="setModal"
      class="button ml-auto flex items-center gap-2"
      @click="setModal?.(false)"
    >
      Close
    </ButtonComponent>
  </div>
</template>

<style scoped></style>
