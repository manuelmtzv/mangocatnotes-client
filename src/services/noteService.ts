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
}
