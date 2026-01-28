import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { PostsService } from './posts.service';
import { RegisterPostDto } from './dto/post-create.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @UseGuards(AuthGuard)
    @Get('/')
    getAllPosts() {
        return this.postsService.getAllPosts();
    }

    @UseGuards(AuthGuard)
    @Post('/')
    createPost(@Req() req, @Body() postData: RegisterPostDto) {
        // console.log({ title: postData.title, content: postData.content, authorId: req.user.id })
        console.log({ user: req.user });
        return this.postsService.createPost({ title: postData.title, content: postData.content, authorId: req.user.userId });
    }
}
