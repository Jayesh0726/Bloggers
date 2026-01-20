import config from '../config/config';
import { Client, Databases, Query } from "appwrite";
export class DBServices{
    client = new Client();
    databases;
    constructor(){
        this.client
        .setEndpoint(config.appwriteUri)
        .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
    }
    async createArticle({title, content, featuredImage, status, slug, userId, authorName}){
        try {
            return await this.databases.createDocument({
                databaseId: config.appwriteDatabaseId,
                collectionId: config.appwriteCollectionId,
                documentId: slug,
                data: {
                title,
                content,
                featuredImage,
                status,
                userId,
                authorName
                }

        });
        } catch (error) {
            console.error("Error creating article:", error);
            throw error;            
        }

    }
    async updateArticle(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument({
                databaseId: config.appwriteDatabaseId,
                collectionId: config.appwriteCollectionId,
                documentId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status
                }
            })
        } catch (error) {
            console.error("Error updating article:", error);
            throw error;
        }
    }

    async deleteArticle(slug){
        try{
            await this.databases.deleteDocument({
                databaseId: config.appwriteDatabaseId,
                collectionId: config.appwriteCollectionId,
                documentId: slug
            })
            return true;
        }catch(error){
            console.error("Error deleting article:", error);
            return false;
        }
    }

    async getArticle(slug){
        try {
            return await this.databases.getDocument({
                databaseId: config.appwriteDatabaseId,
                collectionId: config.appwriteCollectionId,
                documentId: slug
            })
        } catch (error) {
            console.error("Error fetching article:", error);
            return false;
        }
    }
    async listArticles(queries = [Query.equal("status", "active")]){

        try{
            return await this.databases.listDocuments({
                databaseId: config.appwriteDatabaseId,
                collectionId: config.appwriteCollectionId,
                queries
            });

        }catch(error){
            console.error("Error listing articles:", error);
            return false;
        }
    }

}

const dbServices = new DBServices();
export default dbServices;