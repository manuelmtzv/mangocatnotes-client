import { INote } from '../interfaces/INote'

export const noteService = {
  getNotes(): INote[] {
    const notes = localStorage.getItem('notes')

    if (notes) {
      return JSON.parse(notes)
    }

    return []
  },
}
