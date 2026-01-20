import config from '../config/config'
import { Client, Storage, ID, Permission, Role } from 'appwrite';

export class FileServices{
    client = new Client();
    storage;
    constructor(){
        this.client
        .setEndpoint(config.appwriteUri)
        .setProject(config.appwriteProjectId);
        this.storage = new Storage(this.client);
    }
    async uploadFile(file){
        try {
            // Default all uploaded files to be publicly readable so previews work without a session.
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
                [Permission.read(Role.any())]
            );
        } catch (error) {
            console.error("Error while uploading File", error);
            throw error;
        }
    }
    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.error("Error delete File", error);
            return false;
        }
    }
    getFilePreview(fileId){
        return this.storage.getFilePreview(
            config.appwriteBucketId,
            fileId
        );
    }

    getFileView(fileId){
        return this.storage.getFileView(
            config.appwriteBucketId,
            fileId
        );
    }

}

const fileservices = new FileServices();
export default fileservices;