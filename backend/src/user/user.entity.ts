import Article from "src/article/article.entity";
import Comment from "src/comment/comment.entity";
import Vote from "src/vote/vote.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
    @PrimaryGeneratedColumn()
    public id?: number;
    
    @Column({ unique: true })
    public email: string;
    
    @Column()
    public name: string;
    
    @Column()
    public surname: string;

    @Column()
    public password: string;
    
    @OneToMany(() => Article, (article: Article) => article.user)
    @JoinColumn({name: 'userId'})
    public articles?: Article[];

    /*@OneToMany(() => Comment, (comment: Comment) => comment.user)
    @JoinColumn({name: 'userId'})
    public comments?: Comment[];

    @OneToMany(() => Vote, (vote: Vote) => vote.user)
    @JoinColumn({name: 'userId'})
    public votes?: Vote[];*/
    
    @CreateDateColumn({ type: 'timestamp' })
    public created: Date;

}
 
export default User;