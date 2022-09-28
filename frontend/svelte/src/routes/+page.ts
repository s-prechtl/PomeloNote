import {bearerFetch, jwt} from "../models/PomeloUtils";
//
// /** @type {import('./$types').PageLoad} */
// export async function load() {
//     let invalid = !jwt;
//
//     if (!invalid) {
//         const request = await bearerFetch("/users/me", jwt);
//         const response = await request.json();
//
//         invalid = "error" in response;
//     }
//
//     if (invalid) {
//         // @ts-ignore
//         window.location = "/login";
//     }
// }