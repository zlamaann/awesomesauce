import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { ArticleModule } from './article/article.module';
import Joi from '@hapi/joi';
import { DatabaseModule } from './database.module';

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
      })
    }),
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
