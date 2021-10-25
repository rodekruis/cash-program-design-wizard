import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  @InjectRepository(CommentEntity)
  private readonly commentRepository: Repository<CommentEntity>;

  public async post(
    userId: string,
    commentDto: CommentDto,
  ): Promise<CommentEntity> {
    try {
      const comment = await this.commentRepository.save({
        text: commentDto.text,
        program: { id: commentDto.programId },
        question: { id: commentDto.questionId },
        user: { id: userId },
      });
      return comment;
    } catch (err) {
      console.log('err: ', err.code);
      if (err && err.code && err.code == '23503') {
        throw new HttpException(
          'Program or question id does not exist',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new Error(err);
      }
    }
  }
}
