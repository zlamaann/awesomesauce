
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, RelationId, Unique } from "typeorm";
import Comment from "../comment/comment.entity";
import User from "../user/user.entity";

@Entity({ name: 'Vote' })
@Unique("vote_userId_commentId_ip_index", ["user.id", "comment.id", "ip"])
class Vote {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Index('vote_userId_index')
    @ManyToOne(() => User, {cascade: true})
    public user: User;

    @RelationId((vote: Vote) => vote.user )
    public userId: number;

    @Index('vote_commentId_index')
    @ManyToOne(() => Comment, (comment: Comment) => comment.votes, {cascade: true, onDelete: 'CASCADE'})
    public comment: Comment;

    @RelationId((vote: Vote) => vote.comment )
    public commentId: number; 

    @Column()
    public ip: string;
    
    @Column()
    public type: string;

    @CreateDateColumn()
    public created: Date;
    
}
 
export default Vote;