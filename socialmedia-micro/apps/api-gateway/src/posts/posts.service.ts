import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { POSTS_SERVICE } from 'apps/api-gateway/constants/services.constants';
import { firstValueFrom } from 'rxjs';
import { RegisterPostDto } from './dto/post-create.dto';
import { postsMessagePatterns } from 'apps/api-gateway/constants/posts.constants';

@Injectable()
export class PostsService {
    constructor(@Inject(POSTS_SERVICE) private readonly clientPosts: ClientProxy) { }

    async getAllPosts() {
        try {
            const result = await firstValueFrom(
                this.clientPosts.send(postsMessagePatterns.GET_ALL_POSTS, {})
            );
            return result;
        } catch (error) {
            throw new RpcException(error);
        }
    }

    async createPost(postData: { title: string; content: string; authorId: number }) {
        try {
            const result = await firstValueFrom(
                this.clientPosts.send(postsMessagePatterns.CREATE_POST, postData)
            );
            return result;
        } catch (error) {
            throw new RpcException(error);
        }
    } 
}