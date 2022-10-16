<script lang="ts">
    import type {Note} from "../models/types";
    import {onMount} from "svelte";
    import {StrapiNoteRepository} from "../models/StrapiNoteRepository";
    import {Content, Modal, Trigger} from "sv-popup";

    const noteRepo: StrapiNoteRepository = StrapiNoteRepository.getInstance();
    let notes: Note[];

    onMount(async () => {
        notes = await noteRepo.getNotes();
        notes.forEach(note => {
            note.lastViewed = new Date(note.lastViewed);
        });
    });

    /**
     * Adds a Note with the title "New Note" and redirects to editor
     */
    async function addNoteHandler() {
        const newTitle = "New Note";
        const newNote = await addNote(newTitle);
        noteRepo.currentNoteId = newNote.id;
        window.location = "/editor";
    }

    /**
     * Adds a new note to the Database
     * @param title The title of the new Note
     * @return The created Note Object
     */
    async function addNote(title: string): Promise<Note> {
        return await noteRepo.createNote({title: title,});
    }

    /**
     * Deletes the note from the "notes" Array and the database
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
     * Sets the currentNoteId and redirects to the editor
     * @param note The note the user clicked on
     */
    function onNoteLiClick(note) {
        noteRepo.currentNoteId = note.id;
        window.location = "/editor";
    }

    function closeModal(){
        closeModalBool = true;
    }

    let closeModalBool = false;
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
            <button class="btn btn-primary" on:click={() => addNoteHandler()}>Add Note</button>
        </div>
    </div>

    <div class="row">
        <div class="offset-md-4 col-md-4">
            {#if notes?.length > 0}
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
                                    <!-- Delete Note Popup -->
                                    <Modal basic small={true} button={false} close={closeModalBool}> <!-- TODO: how to close properly?! no idea -->
                                        <Content>
                                            <div class="row" style="margin-bottom: 10px;">
                                                <h5>Do you really want to delete the "{note.title}" note?</h5>
                                            </div>
                                            <div class="row">
                                                <div class="col-4 offset-2">
                                                    <button class="btn btn-primary"
                                                            on:click={() => deleteNote(note)}
                                                            on:click={() => closeModal()}>
                                                        <b>Yes</b>
                                                    </button>
                                                </div>
                                                <div class="col-4 offset-2">
                                                    <button class="btn btn-primary" autofocus
                                                            on:click={() => closeModal()}>
                                                        <b>No</b>
                                                    </button>
                                                </div>
                                            </div>
                                        </Content>
                                        <Trigger>
                                            <button style="display: none" id={"noteButton" + note.id}>
                                                <i class="bi bi-x"></i>
                                            </button>
                                        </Trigger>
                                    </Modal>
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
    @import "../customBootstrap.css";

    html,
    :root {
        --sub-txt-color: gray;
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

    .list-date-text {
        color: var(--sub-txt-color);
        font-size: 0.8314159265358979323846264338rem;
    }
</style>