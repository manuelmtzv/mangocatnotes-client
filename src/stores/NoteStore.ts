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
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
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
        note.title = title
        note.content = content
        note.updatedAt = new Date().toISOString()

        noteService.updateNote(note)
      }
    },
    deleteNote(id: string): void {
      const note = this.getNoteById(id)

      this.notes = this.notes.filter((storeNote) => {
        return storeNote.id != note.id
      })

      noteService.deleteNote(note)
    },
  },
})
