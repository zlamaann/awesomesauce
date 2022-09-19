import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config'
import Article from "src/article/article.entity";
import User from "src/user/user.entity";
import Comment from "src/comment/comment.entity";
import Vote from "src/vote/vote.entity";

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
        })
      }),
    ],
  })
  export class DatabaseModule {}