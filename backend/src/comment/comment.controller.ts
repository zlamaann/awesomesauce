import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import JwtAuthGuard from "../auth/jwt.guard";
import { CreateCommentDto } from "./comment.dto";
import CommentService from "./comment.service";

@ApiTags('Comments')
@Controller('comments')
export default class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}
 
  @Get('user/:id')
  getAllArticleComments(@Param('id') id: string) {
    return this.commentService.getAllArticleComments(Number(id));
  }
 
  @Post()
  @UseGuards(JwtAuthGuard)
  async createComment(@Body() comment: CreateCommentDto) {
    return this.commentService.createComment(comment);
  }
}