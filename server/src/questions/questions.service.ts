import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity } from './question.entity';
import { QuestionsRO } from './question.interfaces';

@Injectable()
export class QuestionsService {
  @InjectRepository(QuestionEntity)
  private readonly questionRepository: Repository<QuestionEntity>;

  public async findAll(programId: string): Promise<QuestionsRO> {
    const qb = await this.questionRepository
      .createQueryBuilder('question')
      .select([
        'question.name AS name',
        'question.id AS id',
        '"type"',
        'question.label AS label',
        'section.name',
        'section.id',
        'section.label',
        'answers.text as answer',
        'answers.updated as answerUpdate',
      ])
      .leftJoin('question.section', 'section')
      .leftJoin('question.answers', 'answers')
      .leftJoin('answers.program', 'program', 'program.id = :programId', {
        programId: programId,
      });
    const q = qb.getQuery();
    console.log('q: ', q);
    const questions = await qb.getRawMany();

    return {
      questions: questions,
      count: questions.length,
    };
  }
}
