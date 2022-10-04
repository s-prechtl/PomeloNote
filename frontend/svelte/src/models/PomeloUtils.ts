import {parseCookies} from "nookies";

/**
 * Capitalises first letter of string.
 * @param str
 */
export function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Fetches with applied bearer token.
 * @param endpoint ex.: /users/me
 * @param jwt Java Web Token used to authorize
 * @param baseUrl Base Url of request
 */
export async function bearerFetch(endpoint: string, jwt: string, baseUrl: string = "http://localhost:1337/api") {
    return await fetch(baseUrl + endpoint, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
}


const getJwtCookie = () => {
    // @ts-ignore
    return parseCookies("/").jwt;
};

/**
 * JWT Cookie
 */
export const jwt: string = getJwtCookie();