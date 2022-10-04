import http from ".";
import {  RegisterUser, User, UserCredentials } from "../interface";

class AuthService {
  
    login(data: UserCredentials) {
      return http.post<User>("/auth/login", data);
    }

    logout() {
      return http.post("/auth/logout");
    }

    register(data: RegisterUser) {
      return http.post<RegisterUser>("/auth/register", data);
    }

    authenticate() {
      return http.get("/auth");
    }
  }

export default new AuthService;