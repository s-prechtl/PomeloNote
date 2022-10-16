import type {Authentication} from "../../authentication";

export interface UserRepository {
    /**
     * Registers a new user.
     * @param email
     * @param username
     * @param password
     */
    registerUser(email: string, username: string, password: string): Promise<Authentication>;

    /**
     * Gets the current user.
     * @param jwt
     */
    getMe(jwt: string): Promise<Authentication>;

    loginUser(identifier: string, password: string): Promise<Authentication>;
}