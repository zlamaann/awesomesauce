import { Body, Controller, Delete, Get, Param, Put, Post, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import JwtAuthGuard from "../auth/jwt.guard";
import Article from "./article.entity";
import ArticleService from "./article.service";
import { CreateArticleDto, UpdateArticleDto } from "./article.tdo";

@ApiTags('Articles')
@Controller('articles')
export default class ArticleController {
  constructor(
    private readonly articleService: ArticleService
  ) {}
 
  @Get()
  @ApiOkResponse({ description: 'Articles successfully retrieved' })
  @ApiInternalServerErrorResponse({ description: 'Internal error.'})
  getAllArticles() {
    return this.articleService.getAllArticles();
  }
 
  @Get(':id')
  @ApiOkResponse({ description: 'Article successfully retrieved' })
  @ApiInternalServerErrorResponse({ description: 'Internal error.'})
  getArticleById(@Param('id') id: string) {
    return this.articleService.getArticleById(Number(id));
  }

  @Get('user/:id')
  @ApiOkResponse({ description: 'Article successfully retrieved' })
  @ApiInternalServerErrorResponse({ description: 'Internal error.'})
  @UseGuards(JwtAuthGuard)
  getArticlesByUserId(@Param('id') id: string) {
    return this.articleService.getArticlesByUserId(Number(id));
  }
 
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Article successfully created.', type: Article, })
  @ApiUnauthorizedResponse({ description: 'User unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal error.'})
  async createArticle(@Body() article: CreateArticleDto) {
    return this.articleService.createArticle(article);
  }
 
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Articles successfully retrieved' })
  @ApiUnauthorizedResponse({ description: 'User unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal error.'})
  async updateArticle(@Param('id') id: number, @Body() article: UpdateArticleDto) {
    return this.articleService.updateArticle(Number(id), article);
  }
 
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Articles successfully retrieved' })
  @ApiUnauthorizedResponse({ description: 'User unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal error.'})
  async deleteArticle(@Param('id') id: string) {
    this.articleService.deleteArticle(Number(id));
  }
}