import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata"
import cookieParser = require('cookie-parser');
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor( app.get(Reflector)) );
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
    exposedHeaders: ['set-cookie']
  });
  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.NEST_PORT);
}
bootstrap();
