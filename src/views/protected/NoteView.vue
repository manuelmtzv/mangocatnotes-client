<script setup lang="ts">
import { useRoute } from "vue-router";
import NoteEditForm from "@/components/NoteEditForm.vue";
import useNote from "@/composables/notes/useNote";
import Loading from "vue-loading-overlay";

const route = useRoute();
const { data: note, isLoading } = useNote({
  id: route.params.id as string,
});
</script>

<template>
  <div v-if="!isLoading && note?.data" class="py-6 mb-4">
    <h2 class="text-xl font-semibold mb-4">Note View</h2>

    <!-- Edit form -->
    <NoteEditForm :note="note.data" />
  </div>

  <Loading v-model:active="isLoading" />
</template>
