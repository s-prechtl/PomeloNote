/**
 * User.
 */
export class User {
    id: number;
    email: string;
    username: string;

    // Can be extended by these
    // blocked: boolean;
    // provider: string;
    // confirmed: boolean;
    // createdAt: Date;
    // updatedAt: Date;

    /**
     * Creates the user.
     * @param params Fetch data.
     */
    constructor(params: any) {
        this.id = params?.id;
        this.email = params?.email;
        this.username = params?.username;
    }
}