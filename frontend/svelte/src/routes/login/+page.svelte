<script lang="ts">
    import {setCookie} from "nookies";
    import type {Authentication} from "./models/authentication";
    import { SvelteToast } from '@zerodevx/svelte-toast'
    import {createErrorToast} from "../../models/customToasts";
    import logo from "../../resources/images/logo2.svg";

    let user: string;
    let password: string;
    let rememberMe: boolean = true;


    /**
     * Handles the button click.
     */
    async function handleSubmit() {
        const endpoint = "http://localhost:1337/api/auth/local";
        const payload = {
            identifier: user,
            password: password
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

        if (response.error != null){
            if (response.error.details.errors){
                for (const error of response.error.details.errors) {
                    createErrorToast(error.message);
                }
            } else{
                createErrorToast(response.error.message);
            }
        } else {
            if (rememberMe) {
                setCookie(null, 'jwt', response.jwt, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/'
                })
            }
            window.location = "/";
        }
    }


</script>

<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>PomeloNote | Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
</head>

<body>
<main class="form-signin w-100 m-auto">

    <img class="img-fluid" src="{logo}" alt="Logo">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" bind:value={user}>
        <label for="floatingInput">Email address or username</label>
    </div>
    <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" bind:value={password}>
        <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
        <label>
            <input type="checkbox" value="rememberMe" bind:checked={rememberMe}> Remember me
        </label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" on:click={handleSubmit}>Sign in</button>
    <a href="/register" class="opacity-75 d-flex justify-content-center text-center fs-6">No user yet? Register.</a>
    <p class="mt-5 mb-3 text-muted">&copy;2022</p>

</main>
<SvelteToast></SvelteToast>
</body>
</html>


<style>
    html,
    body {
        height: 100%;
    }

    body {
        align-items: center;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
    }

    .form-signin {
        max-width: 330px;
        padding: 15px;
    }

    .form-signin .form-floating:focus-within {
        z-index: 2;
    }

    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    .img-fluid{
        margin-bottom: 15px;
    }
</style>