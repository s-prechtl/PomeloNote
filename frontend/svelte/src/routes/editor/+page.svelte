<script lang="ts">
    import type {Note} from "../../models/types";
    import {StrapiNoteRepository} from "../../models/repos/note/StrapiNoteRepository";
    import {onMount} from "svelte";

    let noteRepo: StrapiNoteRepository;
    let currentNote: Note;

    onMount(async () => {
        noteRepo = StrapiNoteRepository.getInstance();
        try {
            currentNote = await noteRepo.getNote(noteRepo.currentNoteId);
        } catch {
            returnToListing();
        }
        title = (<Note>currentNote).title;
        content = (<Note>currentNote).content;
    })

    /**
     * saves the currently opened Note and returns to listing
     */
    function saveAndQuit() {
        noteRepo.updateNote(currentNote.id, {
            "title": title,
            "content": content,
        })
        returnToListing();
    }

    /**
     * redirects to listing
     */
    function returnToListing() {
        window.location = "/";
    }

    export let title: string, content: string;

</script>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Editor</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
</head>

<html lang="en">
<div class="offset-3 col-6 wrapper">
    <h1 class="">{title === "" ? "‎" : title}</h1>
    <input bind:value={title} class="input"> <br/>
    <textarea bind:value={content} class="input textarea"></textarea>
    <div class="button-container">
        <button on:click={() => saveAndQuit()} class="btn btn-primary">Save</button>
        <button on:click={() => returnToListing()} class="btn btn-outline-danger">Cancel</button>
    </div>
</div>
</html>

<style>
    @import "../../customBootstrap.css";

    .wrapper {
        margin-top: 20px;
    }

    .input {
        margin-bottom: 10px;
        width: 100%;
    }

    .button-container {
        float: right;
    }

    .textarea {
        height: 300px;
    }
</style>
