import type {Note} from "../../types";
import {parseCookies} from "nookies";
import type {NoteRepository} from "./NoteRepository";
import {currentNoteId} from "../../../stores";


type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export class StrapiNoteRepository implements NoteRepository {
    private static instance: StrapiNoteRepository;
    public static getInstance(): StrapiNoteRepository {
        if (this.instance === undefined || this.instance === null) {
            this.instance = new StrapiNoteRepository();
        }
        return this.instance;
    }

    private constructor() {
        currentNoteId.subscribe((value) => (this._currentNoteId = value));
    }

    private _currentNoteId: unknown;
    private static apiNoteEndpoint: string = "http://localhost:1337/api/notes"

    public set currentNoteId(value: number | undefined) {
        currentNoteId.set(value || -1);
    }

    public get currentNoteId(): number {
        return <number>this._currentNoteId;
    }

    public async getNotes(): Promise<Note[]>{
        const response = await StrapiNoteRepository.fetchStrapiNoteEndpoint("/", 'GET');
        return await response.json();
    }

    public async getNote(id: number): Promise<Note>{
        const response = await StrapiNoteRepository.fetchStrapiNoteEndpoint("/" + id, 'GET');
        return await response.json();
    }

    public async getCurrentNote(): Promise<Note | void> {
        if (this._currentNoteId === null || this._currentNoteId === undefined) {
            return;
        }
        return await this.getNote(this.currentNoteId);
    }

    public async updateNote(id: number, note: Partial<Note>): Promise<Note> {
        const response = await StrapiNoteRepository.fetchStrapiNoteEndpoint("/" + id, 'PUT', note);
        return await response.json();
    }

    public async createNote(note: Partial<Note> & Pick<Note, 'title'>): Promise<Note> {
        const response = await StrapiNoteRepository.fetchStrapiNoteEndpoint("/", 'POST', note);
        return await response.json();
    }

    public async deleteNote(id: number): Promise<void> {
        await StrapiNoteRepository.fetchStrapiNoteEndpoint("/" + id, 'DELETE');
    }

    private static async fetchStrapiNoteEndpoint(path: string, method: HttpMethod, body: Partial<Note> | null = null): Promise<Response> {
        let requestInit: RequestInit = {
            method: method,
            headers: {
                authorization: StrapiNoteRepository.getAuthorizationHeader()
            }
        };
        if (body) {
            requestInit["body"] = JSON.stringify({data: body});
        }
        return await fetch(StrapiNoteRepository.apiNoteEndpoint + path, requestInit);
    }

    private static mockedGetAuthorizationHeader() {
        return "bearer TOKEN"
    }

    static getAuthorizationHeader() {
        // @ts-ignore
        const jwt = parseCookies('/').jwt;
        return `bearer ${jwt}`
    }
}