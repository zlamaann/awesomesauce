import http from "./";
import { Article } from "../interface";

class ArticleService {
    getAll() {
      return http.get<Article[]>("/articles");
    }
  
    get(id: number) {
      return http.get<Article>(`/articles/${id}`);
    }

    getByUser(id: number) {
      return http.get<Article>(`/articles/user/${id}`);
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