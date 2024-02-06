<script setup lang="ts">
import { useRoute } from "vue-router";
import NoteEditForm from "@/components/notes/NoteEditForm.vue";
import useNote from "@/composables/notes/useNote";
import Loading from "vue-loading-overlay";
import NotFound from "@/views/public/NotFound.vue";

const { id: noteId } = useRoute().params as { id: string };

const {
  data: note,
  isLoading,
  refetch,
} = useNote({
  id: noteId,
});
</script>

<template>
  <div v-if="!isLoading && note" class="py-6 mb-4">
    <h2 class="text-xl font-semibold mb-4">Note View</h2>

    <!-- Edit form -->
    <NoteEditForm :note="note" @refetch-note="refetch" />
  </div>

  <Loading v-model:active="isLoading" />

  <NotFound v-if="!isLoading && !note" />
</template>
