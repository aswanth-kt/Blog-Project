import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);
    
    this.account = new Account(this.client);
  };

  async createAccount({ email, password, name }) {
    try {

      const userAccount = await this.account.create(ID.unique(), email, password, name);

      if (userAccount) {
        // login
        return this.login({email, password});
      } else {
        return userAccount;
      }
      
    } catch (error) {
      console.error("error in account creation:", error)
      throw error
    }
  };

  async login({ email, password }) {
    try {

      await this.account.createEmailPasswordSession(email, password);
      
    } catch (error) {
      console.error("error in login:", error)
      throw error
    }
  };

  async currentUser() {
    try {

      await this.account.get();
      
    } catch (error) {
      console.error("error in current user:", error)
      throw error
    };

    return null;
  };

  async logout() {
    try {

      await this.account.deleteSessions();
      
    } catch (error) {
      console.error("error in logout:", error)
      throw error
    }
  }

};

const authService = new AuthService();

export default authService;