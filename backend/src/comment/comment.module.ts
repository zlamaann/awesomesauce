import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Article from "../article/article.entity";
import User from "../user/user.entity";
import CommentController from "./comment.controller";
import Comment from "./comment.entity";
import CommentService from "./comment.service";

@Module({
    imports: [TypeOrmModule.forFeature([Article, User, Comment])],
    controllers: [CommentController],
    providers: [CommentService],
  })
  export class CommentModule {}