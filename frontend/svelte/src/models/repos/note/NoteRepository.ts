import type {Note} from "../../types";

export interface NoteRepository {
    getNotes(): Promise<Note[]>;
    getNote(id: number): Promise<Note>;
    getCurrentNote(): Promise<Note | void>;
    updateNote(id: number, note: Partial<Note>): Promise<Note>;
    deleteNote(id: number): void;
    createNote(note: Partial<Note> & Pick<Note, 'title'>): Promise<Note>;
}