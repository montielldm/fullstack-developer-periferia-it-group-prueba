import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AUTH_SERVICE } from 'apps/api-gateway/constants/services.constants';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from '../config/envs';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: AUTH_SERVICE,
                transport: Transport.TCP,
                options: {
                    host: envs.auth_service_host,
                    port: envs.auth_service_port,
                }
            }
        ])
    ],
    providers: [AuthService, AuthGuard],
    controllers: [AuthController],
    exports: [ClientsModule, AuthGuard],

})
export class AuthModule { }
