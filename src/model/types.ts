export interface Article  {
    id: number;
    title: string;
    shortContent: string;
    content: string,
    img: string;
    user: User;
    commentsCount: number;
    created: Date;
    changed: Date;
}

export interface DetailedArticle extends Article {
    comments: Comment[];
    related: Article[];
}

export type User = {
    id: number;
    email: string;
    name: string;
    surname: string;
}

export type Comment = {
    id: number;
    content: string;
    user: User;
    votes: number;
    replies: Comment[];
    created: Date;
}


