import type {User} from "../../../models/user";

/**
 * User Login Auth.
 */
export interface Authentication {
    jwt: string;
    user: User;
    error: any;
}