<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { cn } from "@/shared/utils/cn";
import { useTags } from "@/modules/tags/composables/useTags";
import { ITag } from "@/modules/tags/interfaces/ITag";
import { Collapse } from "vue-collapsed";

const MAX_RENDERING = 30;

type TagsSelectProps = {
  modelValue: ITag[];
};

type TagsSelectEmits = {
  (event: "update:modelValue", value: ITag[]): void;
};

defineProps<TagsSelectProps>();
const emit = defineEmits<TagsSelectEmits>();
const { tags, isLoading } = useTags();
const selectedTags = ref<ITag[]>([]);
const limitRendering = ref(true);

const handleTagTap = (tag: ITag) => {
  const index = selectedTags.value.findIndex((t) => t.id === tag.id);
  if (index === -1) {
    selectedTags.value.push(tag);
  } else {
    selectedTags.value.splice(index, 1);
  }
};

const checkSelected = (tag: ITag) => {
  return selectedTags.value.some((t) => t.id === tag.id);
};

const renderingTags = computed(() => {
  return limitRendering.value ? tags.value.slice(0, MAX_RENDERING) : tags.value;
});

watchEffect(() => {
  emit("update:modelValue", selectedTags.value);
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <h2 class="font-semibold">Tags:</h2>

    <Collapse
      :when="!isLoading"
      class="v-collapse flex items-center gap-2 flex-wrap"
    >
      <p
        :class="
          cn(
            'text-sm px-2.5 py-0.5 rounded-md text-gray-800 border relative cursor-pointer select-none bg-gray-200',
            tag.color && `bg-[${tag.color}]`,
            checkSelected(tag) && 'border-yellow-500',
          )
        "
        v-for="tag in renderingTags"
        :key="tag.id"
        @click="handleTagTap(tag)"
      >
        {{ tag.name }}

        <span
          :class="[
            'w-3 h-3 rounded-full bg-yellow-300 absolute -top-1 -right-1 leading-none border border-yellow-600',
            checkSelected(tag) ? 'block' : 'hidden',
          ]"
        >
        </span>
      </p>
    </Collapse>

    <button
      v-if="tags.length > MAX_RENDERING"
      @click.prevent="limitRendering = !limitRendering"
      class="text-sm text-gray-800 cursor-pointer w-full text-center mt-2"
    >
      {{ limitRendering ? "Show more" : "Show less" }}
    </button>
  </div>
</template>

<style scoped>
.v-collapse {
  transition: height 350ms ease-in-out;
}
</style>
