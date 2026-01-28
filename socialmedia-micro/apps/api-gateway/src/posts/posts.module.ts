import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AuthModule } from '../auth/auth.module';
import { envs } from '../config/envs';
import { POSTS_SERVICE } from 'apps/api-gateway/constants/services.constants';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: POSTS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.posts_service_host,
          port: envs.posts_service_port,
        }
      }
    ]),
    AuthModule
  ],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
