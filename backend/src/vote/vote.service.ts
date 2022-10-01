import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Comment from "../comment/comment.entity";
import User from "../user/user.entity";
import { CreateVoteDto } from "./vote.dto";
import Vote from "./vote.entity";

@Injectable()
export default class VoteService {

  constructor(
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
 
  async getAllVotes() {
    const votes = await this.voteRepository.find({
      relations: { 
        user: true,
        comment: true 
      }
    }) || [];
    return votes;
  }

  async createVote(data: CreateVoteDto) {
    const user = await this.userRepository.findOne({ where: { id: data.user.id} })
    const comment = await this.commentRepository.findOne({ where: { id: data.comment.id} })
    try {
      const vote = await this.voteRepository.create({ 
        user: user,
        comment: comment,
        type: data.type,
        ip: data.ip,
        created: data.created
       });
      await this.voteRepository.save(vote);
      return vote;
    } catch (error) {
      if (error?.code === '23505') { //unique violation
        throw new HttpException('User already voted', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
