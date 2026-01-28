import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { firstValueFrom, Observable } from 'rxjs';
import { UnauthorizedException } from '../exceptions/auth.exceptions';
import { AUTH_SERVICE } from 'apps/api-gateway/constants/services.constants';
import { ClientProxy } from '@nestjs/microservices';
import { authMessagePatterns } from 'apps/api-gateway/constants/auth.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly clientAuth: ClientProxy) { }
  
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException();
    }

    
    const token = authHeader.split(' ')[1];

    const result = await firstValueFrom(this.clientAuth.send(authMessagePatterns.VALIDATE_TOKEN, token));
    
    if (result && result.valid) {
      req.user = {
        userId: result.user_id,
        email: result.email
      };
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}
