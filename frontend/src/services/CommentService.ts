import http from "./";
import { Comment } from "../interface";

class CommentService {
  getAllArticleComments(id: number) {
      return http.get<Comment[]>(`/comments/article/${id}`);
    }

  getAllComments() {
      return http.get<Comment[]>("/comments");
    }
  
  create(data: Comment) {
      return http.post<Comment>("/comments", data);
    }
  }

export default new CommentService;