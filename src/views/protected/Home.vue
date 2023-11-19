<script setup lang="ts">
import NoteForm from "@/components/notes/NoteForm.vue";
import NoteList from "@/components/notes/NoteList.vue";
</script>

<template>
  <div class="py-8 mb-4">
    <!-- Note form -->
    <NoteForm />

    <!-- Note list -->
    <NoteList />
  </div>
</template>
