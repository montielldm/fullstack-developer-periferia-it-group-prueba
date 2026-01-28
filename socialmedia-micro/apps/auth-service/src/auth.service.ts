import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { USERS_SERVICE } from '../constants/services.constants';
import { usersMessagePatterns } from '../constants/users.constants';
import { firstValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { 
  InvalidCredentialsException, 
  UserServiceUnavailableException,
  InvalidTokenException,
  MicroserviceCommunicationException 
} from './exceptions/auth.exceptions';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@Inject(USERS_SERVICE) private readonly clientUsers: ClientProxy, private jwtService: JwtService) { }

  async signInUser(email: string, password: string) {
    try { 
      const result = await firstValueFrom(this.clientUsers.send(usersMessagePatterns.GET_USER_BY_EMAIL, { email }));
      const isPasswordValid = await bcrypt.compare(password, result.password);

      if (!isPasswordValid) {
        throw new InvalidCredentialsException();
      }

      const payload = { sub: result.id, email: result.email };
      const token = await this.jwtService.signAsync(payload)

      return {
        access_token: token,
        user: {
          id: result.id,
          email: result.email,
          firstName: result.firstName,
          lastName: result.lastName,
          status: result.status.toString()
        }
      };
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }

      if (error.message?.includes('no matching message handler') || 
          error.code === 'ECONNREFUSED' || 
          error.message?.includes('connect ECONNREFUSED')) {
        throw new UserServiceUnavailableException();
      }

      throw new MicroserviceCommunicationException(error.message || 'Authentication service error');
    }
  }

  async validateToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      const result = await firstValueFrom(
        this.clientUsers.send(usersMessagePatterns.GET_USER_BY_EMAIL, { email: decoded.email })
      );
      return {
        valid: true,
        user_id: result.id,
        email: decoded.email
      };
    } catch (error) {
      // Errores de JWT
      if (error.name === 'JsonWebTokenError' || 
          error.name === 'TokenExpiredError' || 
          error.name === 'NotBeforeError') {
        throw new InvalidTokenException();
      }

      // Errores de comunicación con users-service
      if (error.message?.includes('no matching message handler') || 
          error.code === 'ECONNREFUSED') {
        throw new UserServiceUnavailableException();
      }

      // Error genérico
      throw new InvalidTokenException();
    }
  }
}