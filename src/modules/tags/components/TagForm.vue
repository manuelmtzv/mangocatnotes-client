<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { get } from "@vueuse/core";
import useVuelidate from "@vuelidate/core";
import InputWrapper from "@/shared/components/form/InputWrapper.vue";
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";
import { Vue3ColorPicker } from "@cyhnkckali/vue3-color-picker";
import TagPillEntry from "./TagPillEntry.vue";

const state = reactive({
  name: "",
  color: "#fff",
});

const rules = {
  name: {
    required: helpers.withMessage("Tag name is required", required),
    minLength: minLength(3),
    maxLength: maxLength(20),
  },
  color: {
    required: helpers.withMessage("Color is required", required),
  },
};

const showColorPicker = ref(false);
const v$ = useVuelidate(rules, state);

function handleSubmit() {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }
}

onMounted(() => {
  showColorPicker.value = true;
});
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form !max-w-none w-full">
    <h2 class="text-2xl font-semibold">Create a new Tag</h2>

    <InputWrapper :error="get(v$.name.$errors.at(0)?.$message)">
      <input
        class="input w-full"
        type="text"
        id="name"
        placeholder="Tag name"
        v-model="state.name"
        maxlength="20"
        :spellcheck="false"
      />
    </InputWrapper>

    <fieldset v-if="showColorPicker">
      <Vue3ColorPicker
        v-model="state.color"
        mode="solid"
        type="HEX"
        :show-alpha="false"
        input-type="RGB"
        class="!w-full !shadow-none !rounded-md input"
      />

      <span v-if="v$.color.$error" class="text-red-500 text-sm mt-1">{{
        v$.color.$errors.at(0)?.$message
      }}</span>
    </fieldset>

    <div class="flex flex-col gap-2 p-4 border rounded-md">
      <h3 class="pb-1 border-b">Preview</h3>

      <TagPillEntry
        v-if="state.name"
        class-name="w-fit text-base mx-auto cursor-default"
        :tag="state.name"
        :color="state.color"
      />

      <span v-else class="text-gray-500">No tag name provided.</span>
    </div>

    <div class="flex items-center gap-4">
      <slot name="left-button" />

      <button type="submit" class="button submit ml-auto">Create tag</button>
    </div>
  </form>
</template>

<style scoped></style>
