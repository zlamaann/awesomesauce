
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Article from "../article/article.entity";
import { Exclude } from 'class-transformer';
import Vote from "../vote/vote.entity";
import Comment from "../comment/comment.entity";

@Entity({ name: 'User' })
class User {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({ unique: true })
    public email: string;
    
    @Column()
    public name: string;
    
    @Column()
    public surname: string;

    @Column()
    @Exclude()
    public password: string;
    
    @OneToMany(() => Article, (article: Article) => article.user, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'userId'})
    public articles: Article[];

    @OneToMany(() => Comment, (comment: Comment) => comment.user, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'userId'})
    public comments: Comment[];

    @OneToMany(() => Vote, (vote: Vote) => vote.user, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'userId'})
    public votes: Vote[];
    
    @CreateDateColumn({ type: 'timestamp' })
    public created: Date;

}
 
export default User;