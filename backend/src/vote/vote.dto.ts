import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";
import { User, Comment } from "../interface";
import CommentEntity from "../comment/comment.entity";
import UserEntity from "../user/user.entity";


export class CreateVoteDto {

    @ApiProperty({ type: () => UserEntity })
    user: User;

    @ApiProperty({ type: () => CommentEntity })
    comment: Comment;

    @ApiProperty()
    @IsString()
    type: string;

    @ApiProperty()
    @IsString()
    ip: string;
    
    @ApiProperty()
    created: Date;
}