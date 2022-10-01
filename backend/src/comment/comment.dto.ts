import { ApiProperty } from "@nestjs/swagger";
import {  IsDate, IsString } from "class-validator";
import ArticleEntity from "../article/article.entity";
import { Article, Comment, User, Vote } from "../interface";
import CommentEntity from "./comment.entity";
import UserEntity from "../user/user.entity";
import VoteEntity from "../vote/vote.entity";



export class CreateCommentDto {
    @ApiProperty()
    @IsString()
    content: string;

    @ApiProperty({ type: () => CommentEntity })
    commentParent?: Comment;

    @ApiProperty({ type: () => ArticleEntity })
    article: Article

    @ApiProperty({ type: () => UserEntity })
    user: User;

    @ApiProperty({ type: () => [VoteEntity] })
    votes: Vote[];

    @ApiProperty({ type: () => [CommentEntity] })
    replies: Comment[];
    
    @ApiProperty()
    created: Date;
}