import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApiGatewayModule } from './api-gateway.module';
import { CustomExceptionFilter } from './exceptions/custom-exception.filter';
import { envs } from './config/envs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  const config = new DocumentBuilder()
    .setTitle('Social Media API')
    .setDescription('The Social Media API description')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app as any, config);
  SwaggerModule.setup('api', app as any, documentFactory);

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new CustomExceptionFilter());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.listen(envs.port);
}
bootstrap();
