import config from '../config/config';
import { Client, Account, ID, OAuthProvider } from "appwrite";

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
    async getUserPreferences(){
        try {
            return await this.account.getPrefs();
        } catch (error) {
            throw error;
        }
    }
    async logoutUser(){
        try{
            return await this.account.deleteSessions();
        }catch(error){
            throw error;
        }
    }
    async loginWithGoogle(){
        try {
            // Appwrite handles the OAuth redirect internally
            // The redirect URI must be configured in Google Cloud Console
            // Success and failure URLs are where Appwrite redirects after OAuth completes
            return await this.account.createOAuth2Session(
                OAuthProvider.Google,
                `${window.location.origin}/`,
                `${window.location.origin}/login`
            );
        } catch (error) {
            throw error;
        }
    }
    async updateUserName(name){
        try {
            return await this.account.updateName(name);
        } catch (error) {
            throw error;
        }
    }
    async updateUserPassword({password, oldPassword}){
        try {
            return await this.account.updatePassword(password, oldPassword);
        } catch (error) {
            throw error;
        }
    }
    async updateUserPreferences(prefs){
        try {
            return await this.account.updatePrefs(prefs);
        } catch (error) {
            throw error;
        }
    }
    async sendPasswordRecoveryEmail(email){
        try {
            return await this.account.createRecovery(
                email,
                `${window.location.origin}/reset-password`
            );
        } catch (error) {
            throw error;
        }
    }
    async resetPassword({userId, secret, password}){
        try {
            return await this.account.updateRecovery(
                userId,
                secret,
                password
            );
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthServices();
export default authService;