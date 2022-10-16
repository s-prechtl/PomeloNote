<script lang="ts">
    import type {Note} from "../../models/types";
    import {StrapiNoteRepository} from "../../models/repos/note/StrapiNoteRepository";
    import {onMount} from "svelte";
    import {currentNoteId} from "../../stores";

    let noteRepo: StrapiNoteRepository;
    let currentNote: Note;
    let id;

    onMount(async () => {
        currentNoteId.subscribe(v => id = v);
        noteRepo = StrapiNoteRepository.getInstance();
        currentNote = await noteRepo.getNote(noteRepo.currentNoteId);
        title = (<Note>currentNote).title;
        content = (<Note>currentNote).content;
        console.log(noteRepo.currentNoteId)
    })

    export let title: string, content: string;

    function save() {
        noteRepo.updateNote(currentNote.id, {
            "title": currentNote.title,
            "content": currentNote.content
        })
    }

    function cancel() {
        window.location = "/";
    }

</script>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Editor</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <link href="" rel="stylesheet">
</head>

<html lang="en">
<div class="offset-3 col-6">
    <input bind:value={title} class="input"> <br />
    <textarea bind:value={content} class="input"></textarea>
    <button on:click={() => save()} class="btn btn-primary save">Save</button>
    <button on:click={() => cancel()} class="btn btn-outline-danger cancel">Cancel</button>
</div>
</html>

<style>
    .input {
        margin-top: 30px;
        width: 100%;
    }
    .save {
        justify-content: right;
    }

    .cancel {
        justify-content: right;
    }
</style>
