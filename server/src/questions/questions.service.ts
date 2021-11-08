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
        'section.name AS "sectionName"',
        'section.id AS "sectionId"',
        'section.label AS "sectionLabel"',
        'subsection.id AS "subsectionId"',
        'subsection.name AS "subsectionName"',
        'answers.text as answer',
        'answers.updated as "answerUpdated"',
      ])
      .leftJoin('question.subsection', 'subsection')
      .leftJoin('subsection.section', 'section')
      .leftJoin('question.answers', 'answers')
      .leftJoin('answers.program', 'program', 'program.id = :programId', {
        programId: programId,
      })
      .leftJoin('question.tags', 'tags')
      .leftJoin('question.optionChoices', 'optionChoices')
      .groupBy('question.id')
      .addGroupBy('question.name')
      .addGroupBy('question.type')
      .addGroupBy('question.label')
      .addGroupBy('section.name')
      .addGroupBy('section.id')
      .addGroupBy('section.label')
      .addGroupBy('subsection.name')
      .addGroupBy('subsection.id')
      .addGroupBy('answers.text')
      .addGroupBy('answers.updated')
      .addSelect(`array_agg(distinct(tags.name::character varying))`, 'tags')
      .addSelect(
        `COALESCE(json_agg("optionChoices") FILTER (WHERE "optionChoices".id IS NOT NULL), '[]')`,
        'optionChoices',
      )
      .orderBy('section.orderPriority', 'ASC')
      .orderBy('subsection.orderPriority', 'ASC')
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
      question.sectionLabel = parseTranslatableProperty(question.sectionLabel);
      question.label = parseTranslatableProperty(question.label);
      if (question.optionChoices) {
        for (const optionChoice of question.optionChoices) {
          optionChoice.label = parseTranslatableProperty(optionChoice.label);
        }
      }
      return question;
    });

    return {
      questions: questions,
      count: questions.length,
    };
  }
}
