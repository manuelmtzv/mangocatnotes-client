<script setup lang="ts">
import { cn } from "@/shared/utils/cn";
import LoadingSpin from "@shared/components/LoadingSpin.vue";
import { ButtonHTMLAttributes } from "vue";

interface Props extends ButtonHTMLAttributes {
  label?: string;
  loading?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <button
    :class="
      cn(
        'flex items-center gap-2 p-2 h-fit rounded-md border border-gray-300 bg-gray-100 text-gray-700 transition-colors duration-300',
        props.class,
      )
    "
  >
    <p v-if="label">{{ label }}</p>

    <template v-else>
      <slot v-if="!loading" />

      <LoadingSpin :when="loading" class="!h-5 !w-5" />
    </template>
  </button>
</template>
