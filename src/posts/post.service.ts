import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostRequestDto } from './dto/requests/create-post-request.dto';

@Injectable()
export class PostService {
    constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

    async createPost(createPostRequestDto: CreatePostRequestDto): Promise<Post> {
        try {
            const now = new Date().toISOString();
            if (!createPostRequestDto.created_at) {
                createPostRequestDto.created_at = now;
            }
            if (!createPostRequestDto.updated_at) {
                createPostRequestDto.updated_at = now;
            }
            const newPost = this.postRepo.create(createPostRequestDto);
            return await this.postRepo.save(newPost);
        } catch (ex) {
            throw ex;
        }
    }

    async deletePost(id: number): Promise<Post> {
        const post = await this.postRepo.findOneBy({ id });
        if (!post) {
            throw new Error('Post no encontrado');
        }
        await this.postRepo.remove(post);
        return post;
    }

    async getAllPosts(): Promise<Post[]> {
        return await this.postRepo.find();
    }
}