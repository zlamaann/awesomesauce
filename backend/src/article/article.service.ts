import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Article } from "src/interface";


import { CreateArticleDto, UpdateArticleDto } from "./article.tdo";

@Injectable()
export default class ArticleService {
  private lastArticleId = 0;
  private articles: Article[] = [];
 
  getAllArticles() {
    return this.articles;
  }
 
  getArticleById(id: number) {
    const article = this.articles.find(article => article.id === id);
    if (article) {
      return article;
    }
    throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
  }

  getArticlesByUserId(id: number) {
    const article = this.articles.filter(article => article.user.id === id);
    if (article) {
      return article;
    }
    throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
  }
 
  updateArticle(id: number, article: UpdateArticleDto) {
    const articleIndex = this.articles.findIndex(article => article.id === id);
    if (articleIndex > -1) {
      this.articles[articleIndex] = article;
      return article;
    }
    throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
  }
 
  createArticle(article: CreateArticleDto) {
    const newArticle = {
      id: ++this.lastArticleId,
      ...article
    }
    this.articles.push(newArticle);
    return newArticle;
  }
 
  deleteArticle(id: number) {
    const articleIndex = this.articles.findIndex(article => article.id === id);
    if (articleIndex > -1) {
      this.articles.splice(articleIndex, 1);
    } else {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
  }
}