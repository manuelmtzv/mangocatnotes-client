import { defineStore } from 'pinia'
import { INote } from '../interfaces/INote'

import { noteService } from '../services/noteService'

export const useNoteStore = defineStore('noteStore', {
  state: (): { notes: INote[] } => ({
    notes: [],
  }),
  getters: {},
  actions: {
    getNotes() {
      this.notes = noteService.getNotes()
    },
    addNote(note: INote) {
      this.notes.push(note)
    },
  },
})
