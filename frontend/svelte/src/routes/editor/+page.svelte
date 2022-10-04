<script lang="ts">
    import {beforeUpdate} from "svelte";
    import {StrapiNoteRepository} from "../../models/StrapiNoteRepository";
    import {NoteRepository} from "../../models/NoteRepository";

    let noteRepo: NoteRepository;
    let content: string;
    let title: string;

    beforeUpdate(async () => {
        noteRepo = await StrapiNoteRepository.getInstance();
    })


</script>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{"Pomelonote | Edit "}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
</head>

<html lang="en">
<div class="row">
    <div class="offset-md-4 col-md-4 shadow-textarea">

    </div>
</div>
</html>