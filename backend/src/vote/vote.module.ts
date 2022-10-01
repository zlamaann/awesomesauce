import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Comment from "../comment/comment.entity";
import User from "../user/user.entity";
import VoteController from "./vote.controller";
import Vote from "./vote.entity";
import VoteService from "./vote.service";

@Module({
    imports: [TypeOrmModule.forFeature([Comment, User, Vote])],
    controllers: [VoteController],
    providers: [VoteService],
  })
  export class VoteModule {}