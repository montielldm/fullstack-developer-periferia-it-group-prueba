import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'apps/api-gateway/constants/services.constants';
import { firstValueFrom } from 'rxjs';
import { SignInDto } from './dto/signin.dto';
import { authMessagePatterns } from 'apps/api-gateway/constants/auth.constants';

@Injectable()
export class AuthService {
    constructor(@Inject(AUTH_SERVICE) private readonly clientAuth: ClientProxy) { }


    async signIn(signInDto: SignInDto) {
        try {
            const result = await firstValueFrom(
                this.clientAuth.send(authMessagePatterns.SIGNIN, signInDto)
            );
            return result;
        } catch (error) {
            throw new RpcException(error);
        }
    }

}
