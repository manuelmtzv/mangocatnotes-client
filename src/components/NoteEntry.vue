<script setup lang="ts">
import { useCutString } from '../utils/useCutString'
import { INote } from '@/interfaces/INote'

interface IProps {
  note: INote
}

const props = defineProps<IProps>()
const { cutString } = useCutString()

console.log(props.note)
</script>

<template>
  <h3 class="note-entry__title" v-if="note.title">
    {{ cutString(note.title, 50) }}
  </h3>
  <p class="note-entry__description">{{ cutString(note.content, 200) }}</p>
</template>

<style scoped lang="css">
.note-entry__title {
  @apply font-semibold overflow-hidden;
}
.note-entry__description {
  @apply overflow-hidden;
}
</style>
