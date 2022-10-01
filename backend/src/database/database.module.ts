import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config'
import Article from "../article/article.entity";
import User from "../user/user.entity";
import Comment from "../comment/comment.entity";
import Vote from "../vote/vote.entity";

@Module({
    imports: [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          entities: [Article, User, Comment, Vote],
          synchronize: true,
          autoLoadEntities: true
        })
      }),
    ],
  })
  export class DatabaseModule {}