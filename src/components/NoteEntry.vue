<template>
  <h3 class="note-entry__title" v-if="note.title">
    {{ cutString(note.title, 50) }}
  </h3>
  <p>{{ cutString(note.content, 200) }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCutString } from '../utils/useCutString'

export default defineComponent({
  name: 'NoteEntry',
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { cutString } = useCutString()

    return {
      cutString,
      note: props.note,
    }
  },
})
</script>

<style scoped lang="css">
.note-entry__title {
  @apply font-semibold;
}
</style>
