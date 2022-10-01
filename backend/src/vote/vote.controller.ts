import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RealIP } from "nestjs-real-ip";
import JwtAuthGuard from "../auth/jwt.guard";
import { CreateVoteDto } from "./vote.dto";
import VoteService from "./vote.service";

@ApiTags('Votes')
@Controller('votes')
export default class VoteController {
  constructor(
    private readonly voteService: VoteService
  ) {}
 
  @Get()
  getAllVotes() {
    return this.voteService.getAllVotes();
  }
 
  @Post()
  @UseGuards(JwtAuthGuard)
  async createVote(@Body() vote: CreateVoteDto, @RealIP() ip: string) {
    vote.ip = ip;
    return this.voteService.createVote(vote);
  }
}