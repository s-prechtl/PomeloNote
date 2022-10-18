import type {User} from "./user";

/**
 * User Login Auth.
 */
export interface Authentication {
    jwt: string;
    user: User;
    error: any;
}