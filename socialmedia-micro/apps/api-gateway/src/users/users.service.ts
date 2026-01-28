import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { USERS_SERVICE } from 'apps/api-gateway/constants/services.constants';
import { first, firstValueFrom } from 'rxjs';
import { RegisterUserDto } from './dto/user-register.dto';
import { usersMessagePatterns } from 'apps/auth-service/constants/users.constants';

@Injectable()
export class UsersService {
    constructor(@Inject(USERS_SERVICE) private readonly clientUsers: ClientProxy) { }

    async getUserByEmail(email: string) {
        try {
            const result = await firstValueFrom(
                this.clientUsers.send(usersMessagePatterns.GET_USER_BY_EMAIL, { email })
            );
            return result;
        } catch (error) {
            throw new RpcException(error);
        }
    }

    async getUserById(userId: number) {
        try {
            const result = await firstValueFrom(
                this.clientUsers.send(usersMessagePatterns.GET_USER_BY_ID, { userId })
            );
            return result;
        } catch (error) {
            throw new RpcException(error);
        }
    }

    async registerUser(userData: RegisterUserDto) {
        try {
            const result = await firstValueFrom(
                this.clientUsers.send(usersMessagePatterns.CREATE_USER, userData)
            );
            return result;
        } catch (error) {
            throw new RpcException(error);
        }
    }
}
