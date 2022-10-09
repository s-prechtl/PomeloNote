import type {Note} from "./types";

export interface NoteRepository {
    getNotes(): Promise<Note[]>;
    getNote(id: number): Promise<Note>;
    getCurrentNote(): Promise<Note | void>;
    updateNote(id: number, note: Note): Promise<Note>;
    deleteNote(id: number): void;
    createNote(note: Note): Promise<Note>;
}