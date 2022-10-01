import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { ArticleModule } from './article/article.module';
import * as Joi from "@hapi/joi";
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { VoteModule } from './vote/vote.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required()
      })
    }),
    ArticleModule, 
    DatabaseModule,
    AuthModule,
    UserModule,
    CommentModule,
    VoteModule
  ],
  controllers: [ ],
  providers: [ ],
})
export class AppModule {}
