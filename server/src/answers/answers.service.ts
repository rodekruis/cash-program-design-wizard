import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswerEntity } from './answer.entity';
import { AnswerDto } from './dto/answer.dto';

@Injectable()
export class AnswersService {
  @InjectRepository(AnswerEntity)
  private readonly answerRepository: Repository<AnswerEntity>;

  public async post(answerDto: AnswerDto): Promise<void> {
    const originalAnswer = await this.answerRepository.findOne({
      where: {
        program: { id: answerDto.programId },
        question: { id: answerDto.questionId },
      },
    });
    if (originalAnswer) {
      originalAnswer.text = answerDto.text;
      this.answerRepository.save(originalAnswer);
      return;
    }

    try {
      await this.answerRepository.save({
        text: answerDto.text,
        program: { id: answerDto.programId },
        question: { id: answerDto.questionId },
      });
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
