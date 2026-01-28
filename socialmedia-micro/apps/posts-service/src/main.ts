import { NestFactory } from '@nestjs/core';
import { PostsModule } from './posts.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(PostsModule, {
      transport: Transport.TCP,
      options: {
        host: envs.host,
        port: envs.port,
      }
    });
  await app.listen();
}
bootstrap();
