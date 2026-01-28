import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule } from '@nestjs/config';
import { envs } from './config/envs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,      // disponible en toda la app
      envFilePath: '.env', // o ['.env', '.env.local']
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.db_host,
      port: envs.db_port,
      username: envs.db_username,
      password: envs.db_password,
      database: envs.db_name,
      entities: [UserEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {

}
