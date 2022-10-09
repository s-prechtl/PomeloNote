<script lang="ts">
    import logo from "../../resources/images/logo2.svg";
    import {SvelteToast} from "@zerodevx/svelte-toast";
    import {StrapiUserRepo} from "../../models/repos/user/StrapiUserRepo";
    import {handleErrorsFromResponseWithToast} from "../../models/PomeloUtils";

    let user: string;
    let password: string;
    let email: string;


    /**
     * Handles the button click.
     */
    async function handleSubmit() {
        const userRepo: StrapiUserRepo = StrapiUserRepo.getInstance();

        const response = await userRepo.registerUser(email, user, password);

        if (response.error != null) {
            handleErrorsFromResponseWithToast(response);
        } else {
            window.location = "/login";
        }
    }
</script>

<html
        lang="en">
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <title>PomeloNote | Register</title>
    <link crossorigin="anonymous" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"
          integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" rel="stylesheet">
</head>

<body>
<main class="form-signin w-100 m-auto">

    <img alt="Logo" class="img-fluid" src="{logo}">
    <h1 class="h3 mb-3 fw-normal">Register a new user</h1>

    <div class="form-floating">
        <input bind:value={user} class="form-control" id="floatingUsr" placeholder="exampleUsername" type="text">
        <label for="floatingUsr">Username</label>
    </div>

    <div class="form-floating">
        <input bind:value={email} class="form-control" id="floatingInput" placeholder="name@example.com" type="email">
        <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
        <input bind:value={password} class="form-control" id="floatingPassword" placeholder="Password" type="password">
        <label for="floatingPassword">Password</label>
    </div>

    <button class="w-100 btn btn-lg btn-primary" disabled="{(!user || !email || !password)}" on:click={handleSubmit}>
        Register user
        {#if user}: {user} {/if}
    </button>
    <a class="opacity-75 d-flex justify-content-center text-center fs-6" href="/login">Already registered? Login.</a>
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

    .form-signin input[type="text"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-radius: 0;
    }


    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    .img-fluid {
        margin-bottom: 15px;
    }
</style>