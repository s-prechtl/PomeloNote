import type {UserRepository} from "./UserRepository";
import type {Authentication} from "../../authentication";
import {parseCookies} from "nookies";
import type {HttpMethod} from "@sveltejs/kit/types/private";
import {StrapiNoteRepository} from "../note/StrapiNoteRepository";

export class StrapiUserRepo implements UserRepository {
    private static instance: StrapiUserRepo;

    public static getInstance(): StrapiUserRepo {
        if (this.instance === undefined || this.instance === null) {
            this.instance = new StrapiUserRepo();
            this.instance.setup().then(() => {
                if (!this.instance.currentUser?.jwt) {
                    //window.location.href = "/login";
                }
            });
        }
        return this.instance;
    }

    public currentUser?: Authentication;

    private constructor() {
    }

    private static api: string = "http://localhost:1337/api"

    private static apiUserEndpoint: string = StrapiUserRepo.api + "/auth/local"

    /**
     * Sets the current user.
     * @private
     */
    private async setup() {
        this.currentUser = await this.getMe(parseCookies().jwt);
    }

    async getMe(jwt: string): Promise<Authentication> {
        const response = await StrapiUserRepo.fetchStrapi("/me", "GET", null, true, "/users")
        return await response.json();
    }

    async registerUser(email: string, username: string, password: string): Promise<Authentication> {
        const payload = {
            email: email,
            password: password,
            username: username
        };
        const response = await StrapiUserRepo.fetchStrapi("/register", "POST", payload, false);
        return await response.json();
    }

    async loginUser(identifier: string, password: string): Promise<Authentication> {
        const payload = {
            identifier: identifier,
            password: password
        };
        const response = await StrapiUserRepo.fetchStrapi("/", "POST", payload, false);
        return response.json();
    }

    private static async fetchStrapi(path: string, method: HttpMethod, body: any | null = null, authorization: boolean = true, customPath: any = null): Promise<Response> {
        let requestInit: RequestInit = {
            method: method,
        };
        if (authorization){
            requestInit["headers"] = {
                authorization: StrapiNoteRepository.getAuthorizationHeader() ?? '',
            }
        }
        if (body) {
            requestInit["body"] = JSON.stringify({data: body});
        }
        return await fetch((customPath) ? (this.api + customPath + path) : StrapiUserRepo.apiUserEndpoint + path, requestInit);
    }
}