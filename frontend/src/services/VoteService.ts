import http from ".";
import { Vote } from "../interface";

class VoteService {
    getAll() {
      return http.get<Vote[]>("/votes");
    }
  
    create(data: Vote) {
      return http.post<Vote>("/votes", data);
    }
  }

export default new VoteService;