import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/user-register.dto';
import { UserEntity } from './entities/user.entity';
import { UserAlreadyExistsException, UserNotFoundException } from './exceptions/users.exceptions';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async getUserById(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UserNotFoundException();
    }
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      status: user.status.toString()
    };
  }

  async registerUser(userData: RegisterUserDto) {
    const existingUser = await this.userRepository.findOneBy({ email: userData.email });

    if (existingUser) {
      throw new UserAlreadyExistsException();
    }
    const newUser = this.userRepository.create(userData);


    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltOrRounds);

    newUser.password = hashedPassword;
    const savedUser = await this.userRepository.save(newUser);

    const { password, status, ...userWithoutPassword } = savedUser;
    return {
      ...userWithoutPassword,
      status: status.toString()
    };
  }
}
