<script lang="ts">
    import {setCookie} from "nookies";
    import {SvelteToast} from '@zerodevx/svelte-toast'
    import logo from "../../resources/images/logo2.svg";
    import {handleErrorsFromResponseWithToast} from "../../models/PomeloUtils";
    import {StrapiUserRepo} from "../../models/repos/user/StrapiUserRepo";

    let user: string;
    let password: string;
    let rememberMe: boolean = true;


    /**
     * Handles the button click.
     */
    async function handleSubmit() {
        const userRepo: StrapiUserRepo = StrapiUserRepo.getInstance();

        const response = await userRepo.loginUser(user, password);

        if (response.error != null) {
            handleErrorsFromResponseWithToast(response);
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
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <title>PomeloNote | Login</title>
    <link crossorigin="anonymous" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"
          integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" rel="stylesheet">
</head>

<body>
<main class="form-signin w-100 m-auto">

    <img alt="Logo" class="img-fluid" src="{logo}">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
        <input bind:value={user} class="form-control" id="floatingInput" placeholder="name@example.com" type="email">
        <label for="floatingInput">Email address or username</label>
    </div>
    <div class="form-floating">
        <input bind:value={password} class="form-control" id="floatingPassword" placeholder="Password" type="password">
        <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
        <label>
            <input bind:checked={rememberMe} type="checkbox" value="rememberMe"> Remember me
        </label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" on:click={handleSubmit}>Sign in</button>
    <a class="opacity-75 d-flex justify-content-center text-center fs-6" href="/register">No user yet? Register.</a>
    <p class="mt-5 mb-3 text-muted">&copy;2022</p>

</main>
<SvelteToast></SvelteToast>
</body>
</html>

<style>
    @import "../../userInput.css";
    @import "../../customBootstrap.css";

    .form-signin input[type="email"] {
        margin-bottom: -1px !important;
        border-bottom-right-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
    }
</style>