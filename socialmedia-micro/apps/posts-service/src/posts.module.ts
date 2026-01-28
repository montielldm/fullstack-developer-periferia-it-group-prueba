import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { ConfigModule } from '@nestjs/config';
import { envs } from './config/envs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { CommentEntity } from './entities/comment.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_SERVICE } from '../constants/services.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,      // disponible en toda la app
      envFilePath: '.env', // o ['.env', '.env.local']
    }),
    ClientsModule.register([
      {
        name: USERS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.user_service_host,
          port: envs.user_service_port,
        }
      }
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.db_host,
      port: envs.db_port,
      username: envs.db_username,
      password: envs.db_password,
      database: envs.db_name,
      entities: [PostEntity, CommentEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([PostEntity, CommentEntity]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule { }
