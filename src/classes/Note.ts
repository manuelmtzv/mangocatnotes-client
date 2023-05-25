import { INote } from '../interfaces/INote'
import { v4 as uuidv4 } from 'uuid'

export class Note implements INote {
  id: string
  title?: string
  content: string
  createdAt: Date
  updatedAt: Date

  constructor(title: string = '', content: string) {
    this.id = uuidv4()
    this.title = title
    this.content = content
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}
