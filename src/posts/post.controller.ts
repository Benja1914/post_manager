import { Body, Controller, Post, Delete, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostRequestDto } from './dto/requests/create-post-request.dto';
import { BaseResponse } from 'src/_base/response/base.response';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  async createPost(@Body() createPostRequestDto: CreatePostRequestDto) {
    const result = await this.postService.createPost(createPostRequestDto);
    return new BaseResponse(result, 'Post creado correctamente.', true);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    await this.postService.deletePost(id);
    return new BaseResponse([], 'Post eliminado correctamente.', true);
  }

  @Get()
  async getAllPosts() {
    const result = await this.postService.getAllPosts();
    return new BaseResponse(
      result,
      'Lista de posts obtenida correctamente.',
      true,
    );
  }
}
