import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { ArticleModule } from './article/article.module';
import Joi from '@hapi/joi';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import ArticleController from './article/article.controller';
import { AuthService } from './auth/auth.service';
import ArticleService from './article/article.service';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ArticleModule, 
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
    DatabaseModule,
    AuthModule,
    UserModule
  ],
  controllers: [ AuthController, ArticleController],
  providers: [ AuthService, ArticleService, UserService],
})
export class AppModule {}
