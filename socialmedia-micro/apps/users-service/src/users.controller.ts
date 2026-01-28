import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { messagePatterns } from '../constants/users.constants';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(messagePatterns.GET_USER_BY_EMAIL)
  async handleGetUserByEmail(data: { email: string }) {
    return await this.usersService.getUserByEmail(data.email);
  }

  @MessagePattern(messagePatterns.CREATE_USER)
  async handleRegisterUser(data: { email: string; firstName: string; lastName: string; password: string }) {
    return await this.usersService.registerUser(data);
  }

  @MessagePattern(messagePatterns.GET_USER_BY_ID)
  async handleGetUserById(data: { userId: number }) {
    return await this.usersService.getUserById(data.userId);
  }
}
