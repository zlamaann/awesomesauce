export interface Article  {
    id: number;
    title: string;
    content: string,
    img: string;
    user: User;
    commentsCount: number;
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
    votes: number;
    replies: Comment[];
    created: Date;
    article?: Article
}

export interface UserCredentials {
    email: string;
    password: string;
  };

