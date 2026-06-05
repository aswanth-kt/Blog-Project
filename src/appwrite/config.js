import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class StorageService {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  };

  async createPost({title, slug, content, featuredImage, status, id}) {
    try {

      return await this.databases.createDocument(
        conf.appwriteDataBaseId,
        conf.appwriteTableId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          id
        }
      )
      
    } catch (error) {
      console.error("error in create post:", error)
      throw error
    }
  };

  async updatePost({slug, title, content, featuredImage, status}) {
    try {

      const res = await this.databases.updateDocument(
        conf.appwriteDataBaseId,
        conf.appwriteTableId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );

      return res;
      
    } catch (error) {
      console.error("error in update post:", error)
      throw error
    }
  };

  async deletePost(slug) {
    try {

      const res = await this.databases.deleteDocument(
        conf.appwriteDataBaseId,
        conf.appwriteTableId,
        slug
      )
      console.log("Post delete res:", res);

      return true;
      
    } catch (error) {
      console.error("error in delete post:", error);
      return false
      // throw error
    }
  };

  async getPost(slug) {
    try {
      
      return await this.databases.getPost(
        conf.appwriteDataBaseId,
        conf.appwriteTableId,
        slug
      )

    } catch (error) {
      console.error("error in get post:", error)
      throw error
    }
  };

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {

      return await this.databases.listDocuments(
        conf.appwriteDataBaseId,
        conf.appwriteTableId,
        queries
      )
      
    } catch (error) {
      console.error("error in get posts:", error)
      throw error
    }
  };

  // file upload service

  async uploadFile(file) {
    try {

      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      )
      
    } catch (error) {
      console.error("error in file upload:", error)
      throw error
    }
  };

  async deleteFile(fileId) {
    try {

      const res = await this.storage.deleteFile(
        conf.appwriteBucketId,
        fileId
      );

      console.log("Delete file res:", res);

      return true;
      
    } catch (error) {
      console.error("error in felete file:", error)
      return false;
    }
  };

  getFilePreview(fileId) {
    return this.storage.getFilePreview(
      conf.appwriteBucketId,
      fileId
    )
  }

};

const storageService = new StorageService();
export default storageService;