import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async signup({ email, password, name }) {
        try {
            const user = await this.account.create(ID.unique(),name, email, password);
            if (!user) {
                return { success: false, data: null };
            }
            const session = await this.login({ email, password });
            return { success: true, data: session };
        } catch (error) {
            console.log("Error at appwrite signup:", error.message);
            return { success: false, error: error.message };
        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            return { success: true, data: session };
        } catch (error) {
            console.log("Error at appwrite login:", error.message);
            return { success: false, error: error.message };
        }
    }

    async getcurrentuser() {
        try {
            const user = await this.account.get();
            // console.log("Current user:", user);
            if(user) return user;
            return null
        } catch (error) {
            console.log("Error at appwrite getting user:", error.message);
            return false;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            return { success: true };
        } catch (error) {
            console.log("Error at appwrite logout:", error.message);
            return { success: false, error: error.message };
        }
    }
}

const authservice = new AuthService();

export default authservice;
