import http from "./";
import { Comment } from "../interface";

class CommentService {
  getAllArticleComments() {
      return http.get<Comment[]>("/comments");
    }
  
    create(data: Comment) {
      return http.post<Comment>("/comments", data);
    }
  }

export default new CommentService;