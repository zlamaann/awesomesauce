import http, { setAxiosAuthToken } from ".";
import {  User, UserCredentials } from "../interface";

class AuthService {
  
    login(data: UserCredentials) {
      return http.post<User>("/auth/login", data);
    }

    register(data: User) {
      return http.post<User>("/auth/register", data);
    }
  }

export default new AuthService;