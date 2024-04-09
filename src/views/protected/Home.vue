<script setup lang="ts">
import NoteForm from "@/components/notes/NoteForm.vue";
import NoteList from "@/components/notes/NoteList.vue";
import NotePagination from "@/components/notes/NotePagination.vue";
</script>

<template>
  <div class="py-8 mb-4">
    <!-- Note form -->
    <NoteForm />

    <!-- Note list -->
    <NoteList />

    <NotePagination />
  </div>
</template>
