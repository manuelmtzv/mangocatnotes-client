import { INote } from "../interfaces/note/INote";
import { v4 as uuidv4 } from "uuid";

export class Note implements INote {
  id: string;
  title?: string;
  content: string;
  createdAt: string;
  updatedAt: string;

  constructor(title: string = "", content: string) {
    this.id = uuidv4();
    this.title = title;
    this.content = content;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}
