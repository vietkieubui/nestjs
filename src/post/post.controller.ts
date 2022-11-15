import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/post.dto';
import { PostService } from './post.service';

@UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'))
  @Get('/getAllPosts')
  getAllPosts() {
    return this.postService.getAllPosts();
  }
}
