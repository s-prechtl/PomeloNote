<script lang="ts">
    interface Note {
        id: number;
        title: string;
        content: string;
    }

    //TODO: TEMP!!!
    const tempJson = "[{\"id\":0,\"title\":\"samc\",\"content\":\"SAAAAAAAAAAMC\"},{\"id\":1,\"title\":\"Push\",\"content\":\"Kollege Pusch\"},{\"id\":2,\"title\":\"Mike\",\"content\":\"C Meister\"}]";
    //TODO: TEMP!!!

    let notes: Note[] = JSON.parse(tempJson);

    /**
     * Reloads the Notes Listing
     * (by doing something very intelligent)
     */
    function reloadNotesListing(){
        notes = notes.filter(i => i === i);
    }

    /**
     * Gives the user a prompt to input the new title of the note and creates it if the title is valid
     */
    function addNotePrompt(){
        let newTitle = prompt('Name of the new Note');
        if(newTitle != null && newTitle != ''){
            addNote(newTitle);
        }
    }

    /**
     * Adds a new note to the "notes" Array with:
     *  * the latest id + 1
     *  * no content
     * @param title The title of the new Note
     */
    function addNote(title: string) {
        let note: Note = {
            id: notes[notes.length - 1].id + 1,
            title: title,
            content: ""
        };
        notes.push(note);
        reloadNotesListing()
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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
</head>

<div class="col-4 w-100 m-auto">
    <!-- Add Note Button -->
    <!-- &#10133; is a Thiccc Plus UTF-8 Character -->
    <button on:click={() => addNotePrompt()}>&#10133;</button>

    <!-- Notes listing -->
    <ul>
        {#each notes as note}
            <li>
                <span>{note.title}</span>
                <!-- &#128465; is a Trashcan UTF-8 Character -->
                <button on:click={() => removeNote(note)}>&#128465;</button>
            </li>
        {/each}
    </ul>
</div>

<style>
    html,
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

    .center {
        margin: auto;
        width: 50%;
        padding: 10px;
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
        color: #dc4f21;
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