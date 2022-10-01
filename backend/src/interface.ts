export interface Article  {
    id: number;
    title: string;
    perex: string;
    content: string,
    img: string;
    user: CurrentUser;
    comments?: Comment[];
    related?: Article[];
    created: Date;
    changed?: Date;
}

export interface User {
    id: number;
    email: string;
    name: string;
    surname: string;
    password: string;
    articles?: Article[];
    created: Date;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  votes: Vote[];
  replies: Comment[];
  commentParent?: Comment;
  created: Date;
  article: Article
}

export interface Vote {
id: number;
user: User;
comment: Comment;
type: string;
ip: string;
created: Date;
}

export interface UserCredentials {
    email: string;
    password: string;
  };



export interface CurrentUser {
    id: number;
    name: string;
    surname: string;
    token?: string;
  }