import config from '../config/config';
import { Client, Account, ID } from "appwrite";

export class AuthServices{
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(config.appwriteUri)
        .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createUser({email, password, Firstname, Lastname, phone, birthdate}){
        try {
            await this.account.create(ID.unique(), email, password, `${Firstname} ${Lastname}`)

            await this.loginUser({ email, password })

            await this.account.updatePrefs({ Firstname, Lastname, phone: phone || "", birthdate })

            return await this.getUserSession()
        } catch (error) {
            throw error;
        }
    }
    async loginUser({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    async getUserSession(){
        try {
            return await this.account.get();
        } catch (error) {
            return null;
        }
    }
    async logoutUser(){
        try{
            return await this.account.deleteSessions();
        }catch(error){
            throw error;
        }
    }
}

const authService = new AuthServices();
export default authService;