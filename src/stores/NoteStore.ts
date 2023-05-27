import { defineStore } from 'pinia'
import { INote } from '../interfaces/INote'

import { noteService } from '../services/noteService'

export const useNoteStore = defineStore('noteStore', {
  state: (): { notes: INote[] } => ({
    notes: [],
  }),
  getters: {
    sortedByTime(): INote[] {
      return this.notes.slice().sort((a, b) => {
        if (a.updatedAt > b.updatedAt) {
          return -1
        } else if (a.updatedAt < b.updatedAt) {
          return 1
        } else {
          return 0
        }
      })
    },
  },
  actions: {
    getNotes(): void {
      this.notes = noteService.getNotes()
    },
    addNote(note: INote): void {
      const updatedNotes = [...this.notes, note]
      this.notes = updatedNotes
      noteService.addNote(note)
    },
    getNoteById(id: string): INote {
      const note = this.notes.filter((note) => {
        return note.id === id
      })[0]

      return note || null
    },
    updateNote(id: string, title: string, content: string): void {
      const note = this.getNoteById(id)

      if (note) {
        // Update the note in the store
        note.title = title
        note.content = content
        note.updatedAt = new Date().toISOString()

        // Update the note in the localStore
        noteService.updateNote(note)
      }
    },
    deleteNote(id: string): void {
      const note = this.getNoteById(id)

      // Delete the note in the store
      this.notes = this.notes.filter((storeNote) => {
        return storeNote.id != note.id
      })

      // Delete the note in the localStore
      noteService.deleteNote(note)
    },
  },
})
