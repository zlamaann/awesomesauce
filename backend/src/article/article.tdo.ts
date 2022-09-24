import { User } from "../interface";



export class CreateArticleDto {
    title: string;
    content: string;
    img: string;
    user: User;
    commentsCount: number;
    created: Date;
  }

export class UpdateArticleDto {
    id: number;
    title: string;
    content: string;
    img: string;
    user: User;
    commentsCount: number;
    changed: Date;
    created: Date;
  }