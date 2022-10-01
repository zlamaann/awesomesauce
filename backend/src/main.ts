import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata"
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // init swagger
  const config = new DocumentBuilder()
    .setTitle('Awesomesauce API')
    .setDescription('REST API for application filled with awesome articles.')
    .setVersion('1.0')
    .build();
  const options: SwaggerCustomOptions = {
    swaggerOptions: {
      withCredentials: true,
    },
  }
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document, options);

  //set validation pipes
  app.useGlobalPipes(new ValidationPipe());

  //set body limits
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

  //set cookies
  app.use(cookieParser());

  //set CORS
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
    exposedHeaders: ['set-cookie']
  });

  //set global prefix
  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.NEST_PORT);
}
bootstrap();
