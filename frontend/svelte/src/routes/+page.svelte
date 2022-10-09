<script lang="ts">
    import type {Note} from "../models/types";
    import {onMount} from "svelte";
    import type {NoteRepository} from "../models/NoteRepository";
    import {StrapiNoteRepository} from "../models/StrapiNoteRepository";

    const noteRepo: NoteRepository = StrapiNoteRepository.getInstance();

    //
    // //:TODO TEMP!!!
    // const jsonStr = "[{\"id\":0,\"attributes\":{\"title\":\"mike\",\"content\":\"C Moasta\",\"lastViewed\":\"2022-09-27\"}},{\"id\":1,\"attributes\":{\"title\":\"samc\",\"content\":\"drupal gott\",\"lastViewed\":\"1999-09-09\"}},{\"id\":2,\"attributes\":{\"title\":\"DIO\",\"content\":\"in all CAPS\",\"lastViewed\":\"2022-09-27\"}},{\"id\":3,\"attributes\":{\"title\":\"Eren\",\"content\":\"Jäger\",\"lastViewed\":\"2022-09-27\"}},{\"id\":4,\"attributes\":{\"title\":\"stow\",\"content\":\"Beitn Chef\",\"lastViewed\":\"2022-09-27\"}},{\"id\":5,\"attributes\":{\"title\":\"Wonder of U\",\"content\":\"Umm... so, personally... this is the first time this has happened, so I'm a bit surprised. Only a centimeter away... I mean, I don't think there's ever been someone who's gotten that close to me... without a, you know... calamity occurring. I'm not really... not really sure what happens at one centimeter away... 'cause it's my first time. I don't really understand it either. Seriously. But in the flow of calamity... there's nobody who can attack me. Not a single person. That, I know for sure. Wonder of U.\",\"lastViewed\":\"2022-09-27\"}}]";
    // //:TODO TEMP!!!
    //
    // let notes: Note[] = JSON.parse(jsonStr);

    let notes: Note[];
    onMount(async () => {
        notes = await noteRepo.getNotes();
        notes.forEach(note => {
            note.lastViewed = new Date(note.lastViewed);
        });
        console.log(notes);
    });

    /**
     * Reloads the Notes Listing
     * (by doing something very intelligent)
     */
    function reloadNotesListing() {
        notes = notes.filter(i => i === i);
    }

    /**
     * Gives the user a prompt to input the new title of the note and creates it if the title is valid
     */
    function addNotePrompt() {
        let newTitle = prompt('Name of the new Note');
        console.log(notes)
        if (newTitle != null && newTitle != '') {
            addNote(newTitle);
            console.log(notes)
            reloadNotesListing();
        }
    }

    /**
     * Adds a new note to the "notes" Array with:
     *  * the latest id + 1 (or 0 if no notes exist)
     *  * no content
     *  * the current date as the "lastViewed" property
     * @param title The title of the new Note
     */
    function addNote(title: string) {
        const date = new Date();
        const note: Partial<Note> = {
            title: title,
            lastViewed: date
        };

        // notes.push(note);
        // noteRepo.createNote(note);
    }

    /**
     * Gives the user a prompt if they are sure to delete this note and deletes it if they confirm
     * @param note The note to be deleted
     */
    function deleteNotePrompt(note) {
        const reallyDelete = confirm("Do you really want to delete this Note?");
        if (reallyDelete) {
            deleteNote(note);
        }
    }

    /**
     * Deletes the note from the "notes" Array
     * @param note The note to be deleted
     */
    function deleteNote(note) {
        notes = notes.filter(i => i !== note);
        noteRepo.deleteNote(note.id);
    }

    /**
     * Handle when the mouse hovers over a Note List Element
     * @param noteId The ID of the note that is hovered over
     */
    function handleMouseOverLi(noteId: number) {
        document.getElementById("noteButton" + noteId).style.display = "block";
    }

    /**
     * Handle when the mouse exits hovering over a Note List Element
     * @param noteId The ID of the note that is hovered over
     */
    function handleMouseOutLi(noteId: number) {
        document.getElementById("noteButton" + noteId).style.display = "none";
    }

    /**
     * Handles a click on a note list element
     * @param note The note the user clicked on
     */
    function onNoteLiClick(note) {
        window.location = "/editor";
        note.lastViewed = new Date();
    }
</script>


<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>PomeloNote | Home</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
</head>

<body>
<div class="container">
    <div class="row">
        <!-- Add Note Button -->
        <div class="offset-md-7 col-md-1">
            <button class="btn btn-primary" on:click={() => addNotePrompt()}>Add Note</button>
        </div>
    </div>

    <div class="row">
        <div class="offset-md-4 col-md-4">
            {#if notes}
                <!-- Notes listing -->
                <ul>
                    {#each notes as note}
                        <li on:mouseover={() => handleMouseOverLi(note.id)}
                            on:mouseout={() => handleMouseOutLi(note.id)}>
                            <div class="row">
                                <div class="col-10" on:click={() => onNoteLiClick(note)}>
                                    <div>
                                        {note.title}
                                    </div>
                                    <div class="list-date-text">
                                        {note.lastViewed.toLocaleDateString()}
                                    </div>
                                </div>

                                <div class="col-1">
                                    <button style="display: none" id={"noteButton" + note.id}
                                            on:click={() => deleteNotePrompt(note)}>
                                        <i class="bi bi-x"></i>
                                    </button>
                                </div>
                            </div>
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
    </div>
</div>
</body>
</html>

<style>
    html,
    :root {
        --main-txt-color: black;
        --sub-txt-color: gray;
        --cross-txt-color: red;

        --color-primary: #fff494;
        --color-primary-600: #fff17a;
        --color-primary-700: #ffec47;
        --color-primary-800: #ffe714;
        --color-primary-900: #e0c900;
    }

    body {
        height: 100%;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #ffffff;
    }

    li {
        list-style: none;
        padding: 6px 10px;
        margin-bottom: 5px;
        margin-top: 5px;
        border-bottom: 1px solid #ddd;
        border-top: 1px solid #ddd;
        border-radius: 10px;
        border-bottom-color: var(--color-primary-900);
        border-top-color: var(--color-primary-900);
        background-color: var(--color-primary-600);
    }

    li:hover {
        background-color: var(--color-primary-700);
    }

    li button {
        float: right;
        border: none;
        background: transparent;
        padding: 0;
        margin: 0;
        font-size: 18px;
        cursor: pointer;
        transform: scale(1.5);
    }

    li button:hover {
        transform: scale(2);
    }

    li:last-child {
        border-bottom: none;
    }

    ul {
        padding-left: 0;
    }

    .bi-x {
        color: var(--cross-txt-color);
    }

    .btn-primary {
        background-color: var(--color-primary-800);
        border: var(--color-primary-800);
        color: var(--main-txt-color);
    }

    .btn-primary:hover {
        background-color: var(--color-primary-900);
        border: var(--color-primary-900);
        color: var(--main-txt-color);
    }

    .list-date-text {
        color: var(--sub-txt-color);
        font-size: 0.8314159265358979323846264338rem;
    }
</style>