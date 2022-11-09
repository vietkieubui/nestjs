import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreatePostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get('/getPost')
  getPost() {
    return this.postService.getPost();
  }
  @Post()
  createPost(@Req() req: any, @Body() post: CreatePostDto) {
    return this.postService.createPost(post);
  }
}
