import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";
import { User } from "../interface";
import UserEntity from "../user/user.entity";

export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  perex: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  img: string;

  @ApiProperty({ type: () => UserEntity })
  user: User;
  
  @ApiProperty()
  created: Date;
  }

export class UpdateArticleDto {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    perex: string;

    @ApiProperty()
    @IsString()
    content: string;

    @ApiProperty()
    @IsString()
    img: string;

    @ApiProperty({ type: () => UserEntity })
    user: User;

    @ApiProperty()
    changed: Date;

    @ApiProperty()
    created: Date;
  }