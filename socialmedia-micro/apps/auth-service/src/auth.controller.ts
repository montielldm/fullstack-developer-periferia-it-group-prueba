import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SignInDto } from './dto/signin.dto';
import { messagePatterns } from '../constants/auth.constants';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(messagePatterns.SIGNIN)
  async handleSignInUser(@Payload() data: SignInDto) {
    return await this.authService.signInUser(data.email, data.password);
  }

  @MessagePattern(messagePatterns.VALIDATE_TOKEN)
  async handleValidateToken(@Payload() token: string) {
    return await this.authService.validateToken(token);
  }
}
