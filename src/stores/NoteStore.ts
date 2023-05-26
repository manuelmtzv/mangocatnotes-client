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
      this.notes = noteService.addNote(note)
    },
    getNoteById(id: string) {
      const note = this.notes.filter((note) => {
        return note.id === id
      })[0]

      return note || null
    },
  },
})
