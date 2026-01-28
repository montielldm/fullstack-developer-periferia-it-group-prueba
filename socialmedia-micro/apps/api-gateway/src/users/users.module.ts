import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_SERVICE } from 'apps/api-gateway/constants/services.constants';
import { envs } from '../config/envs';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USERS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.users_service_host,
          port: envs.users_service_port,
        }
      }
    ]),
    AuthModule
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
