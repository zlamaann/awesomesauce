import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getTreeRepository, Repository, TreeRepository } from "typeorm";
import Article from "../article/article.entity";
import User from "../user/user.entity";
import { CreateCommentDto } from "./comment.dto";
import Comment from "./comment.entity";

@Injectable()
export default class CommentService {

  constructor(
    @InjectRepository(Comment)
    private commentRepository: TreeRepository<Comment>,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getAllComments() {
    const comments = await this.commentRepository.findTrees({
      relations: ["user", "article"]
    }) || [];
    return comments;
  }
 
  async getAllArticleComments(id: number) {
    const comments = await this.commentRepository.findTrees({
      relations: ["user", "article"]
    }) || [];
    return comments.filter(comment => comment.article.id === id);
  }

  async createComment(data: CreateCommentDto) {
    const user = await this.userRepository.findOne({ where: { id: data.user.id} })
    const article = await this.articleRepository.findOne({ where: { id: data.article.id} })
    const comment = await this.commentRepository.create({ 
      content: data.content,
      user: user,
      votes: data.votes,
      replies: data.replies,
      parentComment: data.commentParent,
      created: data.created,
      article: article
     });
    await this.commentRepository.save(comment);
    return comment;
  }
}