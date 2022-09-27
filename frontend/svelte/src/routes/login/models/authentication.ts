import type {User} from "../../../models/user";

export interface Authentication {
    jwt: string;
    user: User;
    error: any;
}