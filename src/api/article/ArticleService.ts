import http from "../../http-axios";
import { Article } from "../../model/types";

class ArticleService {
    getAll() {
      return http.get<Article[]>("/articles");
    }
  
    get(id: number) {
      return http.get<Article>(`/articles/${id}`);
    }
  
    create(data: Article) {
      return http.post<Article>("/articles", data);
    }
  
    update(id: number, data: Partial<Article>) {
      return http.put<Article>(`/articles/${id}`, data);
    }
  
    delete(id: number) {
      return http.delete<Article>(`/articles/${id}`);
    }
  }

export default new ArticleService;