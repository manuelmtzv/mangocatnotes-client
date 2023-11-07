<script setup lang="ts">
import { useRoute } from "vue-router";
import NoteEditForm from "@/components/NoteEditForm.vue";
import useNote from "@/composables/notes/useNote";

const route = useRoute();
const { data: note, isFetching } = useNote({
  id: route.params.id as string,
});
</script>

<template>
  <div v-if="!isFetching && note?.data" class="py-6 mb-4">
    <h2 class="text-xl font-semibold mb-4">Note View</h2>

    <!-- Edit form -->
    <NoteEditForm :note="note.data" />
  </div>
</template>
