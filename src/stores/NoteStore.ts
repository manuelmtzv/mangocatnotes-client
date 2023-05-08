import { defineStore } from 'pinia'
import { Note } from '../types/Note'

export const useNoteStore = defineStore('noteStore', {
  state: (): { notes: Note[] } => ({
    notes: [],
  }),
  getters: {},
  actions: {
    addNote(note: Note) {
      this.notes.push(note)
    },
  },
})
