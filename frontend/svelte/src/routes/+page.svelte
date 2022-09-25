<script lang="ts">
    import type {Note} from "../types";

    //TODO: TEMP!!!
    const tempJson = "[{\"id\":0,\"title\":\"samc\",\"content\":\"SAAAAAAAAAAMC\",\"lastOpened\":\"2022-09-25T10:45:49.903Z\"},{\"id\":1,\"title\":\"Push\",\"content\":\"Kollege Pusch\",\"lastOpened\":\"2022-09-25T10:50:49.903Z\"},{\"id\":2,\"title\":\"Mike\",\"content\":\"C Meister\",\"lastOpened\":\"2022-09-25T10:09:13.903Z\"},{\"id\":3,\"title\":\"kekw\",\"content\":\"OMEGALUL\",\"lastOpened\":\"2022-09-25T12:03:49.903Z\"}]";
    //TODO: TEMP!!!

    let notes: Note[] = JSON.parse(tempJson);
    sortNotesByDate();
    window.localStorage.setItem("notes", JSON.stringify(notes));

    /**
     * Reloads the Notes Listing
     * (by doing something very intelligent)
     */
    function reloadNotesListing() {
        notes = notes.filter(i => i === i);
    }

    function sortNotesByDate(){
        notes.sort(function(x, y) {
            if (x.lastOpened > y.lastOpened) {
                return 1;
            }

            if (x.lastOpened < y.lastOpened) {
                return -1;
            }

            return 0;
        });
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
            sortNotesByDate();
            reloadNotesListing();
            window.localStorage.setItem("notes", JSON.stringify(notes));
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
     * Removes the note from the "notes" Array
     * @param note The note to be removed
     */
    function removeNote(note) {
        notes = notes.filter(i => i !== note);
    }
</script>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>PomeloNote | Home</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
</head>

<html lang="en">
<!-- Add Note Button -->
<!-- &#10133; is a Thiccc Plus UTF-8 Character -->
<div class="offset-8 col-1">
    <button on:click={() => addNotePrompt()}>&#10133;</button>
</div>

<div class="offset-4 col-4">
    <!-- Notes listing -->
    <ul>
        {#each notes as note}
            <li>
                <span>
                    <a href="/editor" on:click={() => window.localStorage.setItem("clickedNoteId", note.id)}>
                        {note.title}
                    </a>
                </span>
                <!-- &#128465; is a Trashcan UTF-8 Character -->
                <button on:click={() => removeNote(note)}>&#128465;</button>
            </li>
        {/each}
    </ul>
</div>
</html>

<style>
    html,
    :root {
        --main-txt-color: black;
    }

    body {
        height: 100%;
    }

    body {
        display: flex;
        align-items: center;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
    }

    a {
        color: var(--main-txt-color);
        text-decoration: none;
    }

    li {
        list-style: none;
        padding: 6px 10px;
        border-bottom: 1px solid #ddd;
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
</style>