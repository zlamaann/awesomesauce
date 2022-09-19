import { Body, Controller, Delete, Get, Param, Put, Post } from "@nestjs/common";
import ArticleService from "./article.service";
import { CreateArticleDto, UpdateArticleDto } from "./article.tdo";

@Controller('article')
export default class ArticleController {
  constructor(
    private readonly articleService: ArticleService
  ) {}
 
  @Get()
  getAllArticles() {
    return this.articleService.getAllArticles();
  }
 
  @Get(':id')
  getArticleById(@Param('id') id: string) {
    return this.articleService.getArticleById(Number(id));
  }

  @Get(':id')
  getArticlesByUserId(@Param('id') id: string) {
    return this.articleService.getArticlesByUserId(Number(id));
  }
 
  @Post()
  async createArticle(@Body() article: CreateArticleDto) {
    return this.articleService.createArticle(article);
  }
 
  @Put(':id')
  async updateArticle(@Param('id') id: string, @Body() article: UpdateArticleDto) {
    return this.articleService.updateArticle(Number(id), article);
  }
 
  @Delete(':id')
  async deleteArticle(@Param('id') id: string) {
    this.articleService.deleteArticle(Number(id));
  }
}