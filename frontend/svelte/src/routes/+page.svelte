<script lang="ts">
    import type {Note} from "../models/types";
    import {bearerFetch, jwt} from "../models/PomeloUtils";
    import {onMount} from "svelte";

    const endpoint = "/notes";

    let notes: Note[];
    // onMount(async () => {
    //     const response = await bearerFetch(endpoint, jwt);
    //     debugger;
    //     var data = await response.json();
    //     console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    // });

    onMount(() => {
        console.log("snasidbsa dghsasa");
    });

    console.log(notes);

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
     * @param title The title of the new Note
     */
    function addNote(title: string) {
        let date = new Date();
        let newNoteId = (notes.length == 0) ? 0 : notes[notes.length - 1].id + 1
        let note: Note = {
            id: newNoteId,
            title: title,
            content: "",
            lastOpened: date.toISOString()
        };
        notes.push(note);
    }

    /**
     * Gives the user a prompt if they are sure to delete this note and deletes it if they confirm
     * @param note The note to be removed
     */
    function removeNotePrompt(note) {
        const reallyDelete = confirm("Do you really want to delete this Note?");
        if (reallyDelete) {
            removeNote(note);
        }
    }

    /**
     * Removes the note from the "notes" Array
     * @param note The note to be removed
     */
    function removeNote(note) {
        notes = notes.filter(i => i !== note);
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
<div class="row">
    <!-- Add Note Button -->
    <div class="offset-md-7 col-md-1">
        <button class="btn btn-primary" on:click={() => addNotePrompt()}>Add Note</button>
    </div>

    <div class="offset-md-4 col-md-4">
        <!-- Notes listing -->
        <ul>
            {#each notes as note}
                <li on:mouseover={() => handleMouseOverLi(note.id)}
                    on:mouseout={() => handleMouseOutLi(note.id)}>
                    <div class="row">
                        <div class="col-md-10" on:click={() => onNoteLiClick(note)}>
                        <span>
                            {note.title} <br/>
                            {note.lastOpened}
                        </span>
                        </div>
                        <div class="col-md-1">
                            <button style="display: none" id={"noteButton" + note.id}
                                    on:click={() => removeNotePrompt(note)}>
                                <i class="bi bi-x"></i>
                            </button>
                        </div>
                    </div>
                </li>
            {/each}
        </ul>
    </div>
</div>
</body>
</html>

<style>
    html,
    :root {
        --main-txt-color: black;
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

    a {
        color: var(--main-txt-color);
        text-decoration: none;
    }

    li {
        list-style: none;
        padding: 6px 10px;
        border-bottom: 1px solid #ddd;
        border-bottom-color: var(--color-primary-900);
        background-color: var(--color-primary-600);
    }

    li button {
        float: right;
        border: none;
        background: transparent;
        padding: 0;
        margin: 0;
        font-size: 18px;
        cursor: pointer;
    }

    li button:hover {
        transform: scale(1.7);
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
</style>