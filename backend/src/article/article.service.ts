import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import User from "../user/user.entity";
import Article from "./article.entity";


import { CreateArticleDto, UpdateArticleDto } from "./article.tdo";

@Injectable()
export default class ArticleService {

  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
 
  async getAllArticles() {
    const articles = await this.articleRepository.find({
      relations: { user: true }
    }) || [];
    return articles;
  }
 
  async getArticleById(id: number) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: { 
        user: true,
        comments: true
      }
    });
    if (article) {
      return article;
    }
    throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
  }

  async getArticlesByUserId(id: number) {
    const user = await this.userRepository.findOne({ where: { id } })
    const articles = await this.articleRepository.find({
      where: { user: { id: user.id } },
      relations: { user: true }
    }) || [];
    return articles;
  }
 
  async updateArticle(id: number, data: UpdateArticleDto) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: { user: true }
    });
    if (!article) throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    await this.articleRepository.update({ id }, {
      title: data.title,
      perex: data.perex,
      content: data.content,
      img: data.img,
      changed: data.changed
    })
    return article;
  }
 
  async createArticle(data: CreateArticleDto) {
    const user = await this.userRepository.findOne({ where: { id: data.user.id} })
    const article = await this.articleRepository.create({ 
      title: data.title,
      perex: data.perex,
      content: data.content,
      img: data.img,
      user: user,
      created: data.created
     });
    await this.articleRepository.save(article);
    return article;
  }
 
  async deleteArticle(id: number) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: { user: true }
    });
    if (!article) throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    await this.articleRepository.remove(article);
    return article;
  }
}