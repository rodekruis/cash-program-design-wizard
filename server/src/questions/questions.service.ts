import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parseTranslatableProperty } from 'src/helpers/translatable-string.helper';
import { Repository } from 'typeorm';
import { QuestionEntity } from './question.entity';
import { QuestionsRO } from './question.interfaces';

@Injectable()
export class QuestionsService {
  @InjectRepository(QuestionEntity)
  private readonly questionRepository: Repository<QuestionEntity>;

  public async findAll(
    programId: string,
    section: string,
    tags: string[] | string,
  ): Promise<QuestionsRO> {
    let qb = await this.questionRepository
      .createQueryBuilder('question')
      .select([
        'question.name AS name',
        'question.id AS id',
        'question.type AS type',
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
      })
      .leftJoin('question.tags', 'tags')
      .groupBy('question.id')
      .addGroupBy('question.name')
      .addGroupBy('question.type')
      .addGroupBy('question.label')
      .addGroupBy('section.name')
      .addGroupBy('section.id')
      .addGroupBy('section.label')
      .addGroupBy('answers.text')
      .addGroupBy('answers.updated')
      .addSelect(`array_agg(tags.name::character varying)`, 'tags')
      .orderBy('section.orderPriority', 'ASC')
      .addOrderBy('question.orderPriority', 'ASC');
    if (section) {
      qb = qb.where('section.id = :section', {
        section: section,
      });
    }
    if (tags) {
      if (typeof tags === 'string') {
        tags = [tags];
      }
      qb = qb
        .leftJoin('question.tags', 'tags_filter')
        .where('tags_filter.name IN (:...tags)', {
          tags: tags,
        })
        .addGroupBy('tags_filter');
    }

    let questions = await qb.getRawMany();

    // Process JSON-string content so the client doesn't have to
    questions = questions.map((question) => {
      question.section_label = parseTranslatableProperty(
        question.section_label,
      );
      question.label = parseTranslatableProperty(question.label);
      return question;
    });

    return {
      questions: questions,
      count: questions.length,
    };
  }
}
