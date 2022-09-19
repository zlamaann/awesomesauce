import User from "src/user/user.entity";
import Comment from "src/comment/comment.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";

@Entity()
class Article {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column()
    public title: string;
    
    @Column()
    public content: string;
    
    @Column()
    public img: string;
    
    @Index('article_userId_index')
    @ManyToOne(() => User, (user: User) => user.articles)
    public user: User;

    @RelationId((article: Article) => article.user)
    public userId: number;
    
    @OneToMany(() => Comment, (comment: Comment) => comment.article)
    @JoinColumn({name: 'articleId'})
    public comments?: Comment[];
    
    @ManyToMany(() => Article,(article: Article) => article.related)
    @JoinTable()
    public related?: Article[];
    
    @CreateDateColumn({ type: 'timestamp' })
    public created: Date;
    
    @UpdateDateColumn()
    public changed: Date;
}
 
export default Article;