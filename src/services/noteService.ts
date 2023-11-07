import { INote } from '../interfaces/INote'

export const noteService = {
  getNotes(): INote[] {
    const notes = localStorage.getItem('notes')

    if (notes) {
      return JSON.parse(notes)
    }

    return []
  },
  addNote(note: INote): INote[] {
    const notes = this.getNotes()
    notes.push(note)
    localStorage.setItem('notes', JSON.stringify(notes))

    return notes
  },
  updateNote(note: INote): void {
    const notes = this.getNotes()
    const index = notes.findIndex((localNote) => localNote.id === note.id)

    if (index !== -1) {
      notes[index] = note

      localStorage.setItem('notes', JSON.stringify(notes))
    }
  },
  deleteNote(note: INote): void {
    const updatedNotes = this.getNotes().filter((localNote) => {
      return localNote.id != note.id
    })

    localStorage.setItem('notes', JSON.stringify(updatedNotes))
  },
}
