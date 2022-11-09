import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/post.dto';
import { PostRepository } from './repositories/post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async createPost(post: CreatePostDto) {
    const new_post = await this.postRepository.create(post);
    return new_post;
  }

  getPost(): string {
    return 'hello Post111112121';
  }
}
