<script setup lang="ts">
import { reactive } from "vue";
import { get } from "@vueuse/core";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";
import { Vue3ColorPicker } from "@cyhnkckali/vue3-color-picker";
import { ITag } from "@/modules/tags/interfaces/ITag";
import InputWrapper from "@/shared/components/form/InputWrapper.vue";
import { useToast } from "vue-toast-notification";
import { useTagMutation } from "@/modules/tags/composables/useTagMutation";
import LoadingSpin from "@/shared/components/LoadingSpin.vue";

type TagEditFormProps = {
  tag: ITag;
};

const props = defineProps<TagEditFormProps>();
const toast = useToast();
const { editTagAsync, editTagMutation } = useTagMutation();

const state = reactive({
  name: props.tag.name,
  color: props.tag.color,
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

const v$ = useVuelidate(rules, state);

async function handleSubmit() {
  v$.value.$validate();

  if (v$.value.$invalid) {
    console.log("Form has errors!");
    return;
  }

  const result = await editTagAsync({
    id: props.tag.id,
    name: state.name,
    color: state.color,
  });

  v$.value.$reset();

  state.color = result.color;
  state.name = result.name;

  toast.success("Tag updated successfully!");
}
</script>

<template>
  <form
    class="flex flex-col gap-2 p-4 text-sm min-w-[22rem] max-w-[22rem]"
    @submit.prevent="handleSubmit"
  >
    <InputWrapper class="gap-1" :error="get(v$.name.$errors.at(0)?.$message)">
      <input
        v-model="state.name"
        type="text"
        class="input"
        placeholder="New name"
      />
    </InputWrapper>

    <fieldset>
      <Vue3ColorPicker
        v-model="state.color"
        mode="solid"
        type="HEX"
        :show-alpha="false"
        input-type="RGB"
        class="!w-full !shadow-none !rounded-md input"
      />

      <span v-if="v$.color.error" class="text-red-500 text-sm mt-1">{{
        v$.color.$errors.at(0)?.$message
      }}</span>
    </fieldset>

    <button
      class="button submit !w-full flex items-center justify-center gap-2"
    >
      Save changes

      <LoadingSpin :when="editTagMutation.isLoading.value" class="!h-4 !w-4" />
    </button>
  </form>
</template>

<style scoped>
.input {
  @apply w-full border border-gray-300;
}
.tag-label {
  @apply font-semibold pb-1 border-b-2 border-gray-200;
}
</style>
