<script setup lang="ts">
import { ref } from "vue";
import Loading from "vue-loading-overlay";
import { useTags } from "@/modules/tags/composables/useTags";
import TagPillEntry from "@/modules/tags/components/TagPillEntry.vue";
import TagEditForm from "@/modules/tags/components/TagEditForm.vue";
import { ITag } from "@/modules/tags/interfaces/ITag";
import ButtonComponent from "@/shared/components/form/ButtonComponent.vue";
import { MAX_TAGS_PER_USER } from "@/config/constants";
import TagCreateModal from "./TagCreateModal.vue";
import ListTransitionWrapper from "@/shared/components/animations/ListTransitionWrapper.vue";

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
    <div class="flex items-center justify-between gap-4 border-b pb-4">
      <div>
        <h2 class="font-semibold text-lg">
          Tags administration panel
          <span
            v-if="!isLoading && tags.length"
            v-tooltip="
              `Every user can have a maximum of ${MAX_TAGS_PER_USER} tags`
            "
            class="text-sm cursor-default"
          >
            {{ `(${tags.length}/${MAX_TAGS_PER_USER})` }}
          </span>
        </h2>

        <p class="text-sm text-gray-800">
          Select a tag to edit its name or color.
        </p>
      </div>

      <TagCreateModal :disabled="tags.length >= MAX_TAGS_PER_USER" />
    </div>

    <ListTransitionWrapper
      v-if="tags.length"
      class="v-collapse flex gap-2 flex-wrap justify-around w-full"
    >
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
    </ListTransitionWrapper>

    <p v-else class="text-gray-500">No tags to show already.</p>

    <p v-if="isLoading" class="text-sm text-gray-800">Loading...</p>

    <ButtonComponent
      v-if="setModal"
      class="button ml-auto flex items-center gap-2"
      @click="setModal?.(false)"
    >
      Close
    </ButtonComponent>

    <Loading v-model:active="isLoading" />
  </div>
</template>

<style scoped></style>
