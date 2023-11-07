import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { INote } from '@/interfaces/INote'

export const useNoteStore = defineStore('noteStore', () => {
  const notes = ref<INote[]>([])

  return {
    notes,

    sortedByTime: computed(() => {
      return notes.value.slice().sort((a, b) => {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      })
    }),

    getNotes(): void {},
    addNote(note: INote): void {
      const updatedNotes = [...notes.value, note]
      notes.value = updatedNotes
    },
    setNotes(newNotes: INote[] | undefined): void {
      if (newNotes) notes.value = newNotes
    },
    getNoteById(id: string): INote {
      const note = notes.value.filter((note) => {
        return note._id === id
      })[0]

      return note || null
    },
    updateNote(id: string, title: string, content: string): void {
      const note = this.getNoteById(id)

      if (note) {
        note.title = title
        note.content = content
        note.updatedAt = new Date().toISOString()
      }
    },
    deleteNote(id: string): void {
      const note = this.getNoteById(id)

      notes.value = notes.value.filter((storeNote) => {
        return storeNote._id != note._id
      })
    },
  }
})
