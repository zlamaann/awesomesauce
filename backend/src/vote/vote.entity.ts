
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import Comment from "../comment/comment.entity";
import User from "../user/user.entity";

@Entity({ name: 'Vote' })
class Vote {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Index('vote_userId_index')
    @ManyToOne(() => User, {cascade: true})
    public user: User;

    @RelationId((vote: Vote) => vote.user )
    public userId: number;

    @Index('vote_commentId_index')
    @ManyToOne(() => Comment, (comment: Comment) => comment.votes, {cascade: true})
    public comment: Comment;

    @RelationId((vote: Vote) => vote.comment )
    public commentId: number; 

    @Column()
    public ip: string;
    
    @Column()
    public type: string;
    
}
 
export default Vote;