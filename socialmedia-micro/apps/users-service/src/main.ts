import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersModule, {
    transport: Transport.TCP,
    options: {
      host: envs.host,
      port: envs.port,
    }
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.listen();
}
bootstrap();
