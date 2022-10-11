<script lang="ts">
    import logo from "../../resources/images/logo2.svg";
    import {SvelteToast} from "@zerodevx/svelte-toast";
    import type {Authentication} from "../login/models/authentication";
    import {createErrorToast} from "../../models/customToasts";

    let user: string;
    let password: string;
    let email: string;


    /**
     * Handles the button click.
     */
    async function handleSubmit() {
        const endpoint = "http://localhost:1337/api/auth/local/register";
        const payload = {
            email: email,
            password: password,
            username: user
        };

        const login = await fetch(endpoint, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        const response: Authentication = await login.json();

        if (response.error != null) {
            if (response.error.details.errors) {
                for (const error of response.error.details.errors) {
                    createErrorToast(error.message);
                }
            } else {
                createErrorToast(response.error.message);
            }
        } else {
            window.location = "/login";
        }
    }
</script>

<html
        lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>PomeloNote | Register</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
</head>

<body>
<main class="form-signin w-100 m-auto">

    <img class="img-fluid" src="{logo}" alt="Logo">
    <h1 class="h3 mb-3 fw-normal">Register a new user</h1>

    <div class="form-floating">
        <input type="text" class="form-control" id="floatingUsr" placeholder="exampleUsername" bind:value={user}>
        <label for="floatingUsr">Username</label>
    </div>

    <div class="form-floating">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" bind:value={email}>
        <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" bind:value={password}>
        <label for="floatingPassword">Password</label>
    </div>

    <button class="w-100 btn btn-lg btn-primary" disabled="{(!user || !email || !password)}" on:click={handleSubmit}>
        Register user
        {#if user}: {user} {/if}
    </button>
    <a href="/login" class="opacity-75 d-flex justify-content-center text-center fs-6">Already registered? Login.</a>
    <p class="mt-5 mb-3 text-muted">&copy;2022</p>

</main>
<SvelteToast></SvelteToast>
</body>
</html>

<style>
    @import "../../userInput.css";
    @import "../../customBootstrap.css";
</style>