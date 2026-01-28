import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/user-register.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard)
    @Get("get-profile")
    getUserByEmail(@Req() req) {
        const userId = req.user.userId;
        
        return this.usersService.getUserById(userId);
    }

    @Post('register')
    registerUser(@Body() userData: RegisterUserDto) {
        return this.usersService.registerUser(userData);
    }
}
