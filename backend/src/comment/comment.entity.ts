import Article from "src/article/article.entity";
import User from "src/user/user.entity";
import Vote from "src/vote/vote.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, Tree, TreeChildren, TreeParent } from "typeorm";

@Entity()
@Tree("materialized-path")
class Comment {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column()
    public content: string;
    
    @Index('comment_userId_index')
    @ManyToOne(() => User, {cascade: true})
    public user: User;

    @RelationId((comment: Comment) => comment.user )
    public userId: number;

    @Index('comment_articleId_index')
    @ManyToOne(() => Article, (article: Article) => article.comments, {cascade: true})
    public article: Article;

    @RelationId((comment: Comment) => comment.article )
    public articleId: number;
    
    @OneToMany(() => Vote, (vote: Vote) => vote.comment)
    @JoinColumn({name: 'commentId'})
    public votes?: Vote[];
    
    /*@OneToMany(() => Comment, (comment: Comment) => comment.parentComment)
    @JoinColumn({name: 'parentCommentId'})*/
    @TreeChildren()
    public replies: Comment[];

    /*@ManyToOne(() => Comment, (comment: Comment) => comment.replies)*/
    @TreeParent()
    public parentComment: Comment;

    /*@RelationId((comment: Comment) => comment.parentComment)
    public parentCommentId: number;*/
    
    @CreateDateColumn()
    public created: Date;
    
}
 
export default Comment;