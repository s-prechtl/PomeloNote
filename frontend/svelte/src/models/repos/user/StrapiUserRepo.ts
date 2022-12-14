import type {UserRepository} from "./UserRepository";
import type {Authentication} from "../../authentication";
import type {HttpMethod} from "@sveltejs/kit/types/private";
import {StrapiNoteRepository} from "../note/StrapiNoteRepository";
import {error} from "@sveltejs/kit";
import {User} from "../../user";

export class StrapiUserRepo implements UserRepository {
    private static instance: StrapiUserRepo;

    public static getInstance(verification: boolean = true): StrapiUserRepo {
        if (this.instance === undefined || this.instance === null) {
            this.instance = new StrapiUserRepo();
            this.instance.verify().then(() => {
                if (verification && !this.instance.verified) {
                    window.location.href = "/login";
                }
            });
        }
        return this.instance;
    }

    private verified: boolean = false;

    private constructor() {
    }

    private static api: string = "http://localhost:1337/api"

    private static apiUserEndpoint: string = StrapiUserRepo.api + "/auth/local"

    /**
     * Verifies the current users jwt.
     * @private
     */
    private async verify() {
        this.verified = false;
        let result = await this.getMe();
        if (!result.error) {
            this.verified = true;
        }
    }

    async getMe(): Promise<Authentication> {
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
        if (authorization && body) {
            requestInit["headers"] = {
                authorization: StrapiNoteRepository.getAuthorizationHeader() ?? '',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        } else if (authorization) {
            requestInit["headers"] = {
                authorization: StrapiNoteRepository.getAuthorizationHeader() ?? '',
            }
        } else if (body) {
            requestInit["headers"] = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        if (body) {
            requestInit["body"] = JSON.stringify(body)
        }
        return await fetch((customPath) ? (this.api + customPath + path) : StrapiUserRepo.apiUserEndpoint + path, requestInit);
    }
}