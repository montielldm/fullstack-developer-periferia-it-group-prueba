import { Controller } from '@nestjs/common';
import { PostsService } from './posts.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterPostDto } from './dto/post-create.dto';
import { messagePatterns } from '../constants/posts.constants';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @MessagePattern(messagePatterns.GET_ALL_POSTS)
  async handleGetAllPosts() {
    return await this.postsService.getAllPosts();
  }

  @MessagePattern(messagePatterns.CREATE_POST)
  async handleCreatePost(@Payload() data: RegisterPostDto) {
    return await this.postsService.createPost(data);
  }
}
