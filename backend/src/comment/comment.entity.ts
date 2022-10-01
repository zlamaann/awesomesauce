
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, Tree, TreeChildren, TreeParent } from "typeorm";
import Vote from "../vote/vote.entity";
import Article from "../article/article.entity";
import User from "../user/user.entity";


@Entity()
@Tree("materialized-path")
class Comment {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column()
    public content: string;
    
    @Index('comment_userId_index')
    @ManyToOne(() => User, {cascade: true, eager: true})
    public user: User;

    @RelationId((comment: Comment) => comment.user )
    public userId: number;

    @Index('comment_articleId_index')
    @ManyToOne(() => Article, (article: Article) => article.comments, {cascade: true, eager: true})
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
    @TreeParent({ onDelete: 'CASCADE' })
    public parentComment: Comment;

    /*@RelationId((comment: Comment) => comment.parentComment)
    public parentCommentId: number;*/
    
    @CreateDateColumn()
    public created: Date;
    
}
 
export default Comment;