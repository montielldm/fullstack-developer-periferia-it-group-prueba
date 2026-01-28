import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UsersModule, AuthModule, PostsModule],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
