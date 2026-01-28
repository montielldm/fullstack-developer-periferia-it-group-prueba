import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { RegisterPostDto } from './dto/post-create.dto';
import { USERS_SERVICE } from '../constants/services.constants';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { usersMessagePatterns } from '../constants/users.constants';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
    @Inject(USERS_SERVICE) private readonly clientUsers: ClientProxy
  ) { }

  async getAllPosts() {
    const posts = await await this.postRepository.find({
      order:{
        createdAt: 'DESC'
      }
    });
    const postsWithUserDetails = await Promise.all(posts.map(async post => {
      const user = await firstValueFrom(this.clientUsers.send(usersMessagePatterns.GET_USER_BY_ID, { userId: post.authorId }));
      return {
        ...post,
        author: user
      };
    }));
    return postsWithUserDetails;
  }

  async createPost(postData: RegisterPostDto) {
    const newPost = this.postRepository.create({
      title: postData.title,
      content: postData.content,
      authorId: postData.authorId
    });
    return await this.postRepository.save(newPost);
  }
}
