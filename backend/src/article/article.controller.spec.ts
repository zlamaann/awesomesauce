import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "../user/user.entity";
import ArticleController from "./article.controller"
import Article from "./article.entity";
import ArticleService from "./article.service";



describe('ArticleController', () => {
    let articleController: ArticleController;
    let articleService: ArticleService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [TypeOrmModule.forFeature([Article, User])],
            controllers: [ArticleController],
            providers: [ArticleService],
            exports: [ArticleService]
        }).compile();

        articleService = module.get<ArticleService>(ArticleService);
        articleController = module.get<ArticleController>(ArticleController);
    });

    describe('receiveAll', () => {
        it('should return an array of articles',async () => {
            const result = new Promise<Article[]>((resolve, reject) => {});
            jest.spyOn(articleService, 'getAllArticles').mockImplementation(() => result)

            expect(await articleController.getAllArticles()).toBe(result);
        })
    })
})