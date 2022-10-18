import {writable} from "svelte/store";
import {browser} from "$app/environment"
export const currentNoteId = writable<number>();
if (browser) {
    currentNoteId.set(Number(localStorage.getItem("currentNoteId") || ""))
    currentNoteId.subscribe(val => localStorage.setItem("currentNoteId", String(val)));
}