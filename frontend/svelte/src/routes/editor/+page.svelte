<script lang="ts">
    import type {Note} from "../../types";

    let notes: Note[] = JSON.parse(window.localStorage.getItem("notes"));
    const clickedNoteId = window.localStorage.getItem("clickedNoteId");

    const currNote = notes.find((note)=>{
        return note.id === parseInt(clickedNoteId);
    });
</script>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{"Pomelonote | Edit " + currNote.title}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
</head>

<html lang="en">
<div class="offset-3 col-6">
    {currNote.content}
</div>
</html>
