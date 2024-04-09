<script setup lang="ts">
import NoteForm from "@modules/note/components/NoteForm.vue";
import NoteList from "@modules/note/components/NoteList.vue";
import NotePagination from "@modules/note/components/NotePagination.vue";
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
