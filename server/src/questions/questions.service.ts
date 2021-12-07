import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswerEntity } from '../answers/answer.entity';
import { OptionChoiceEntity } from '../option-choices/option-choice.entity';
import { TagEntity } from '../tags/tag.entity';
import { CommentEntity } from './../comments/comment.entity';
import { QuestionEntity } from './question.entity';
import { QuestionSearchOption, QuestionsRO } from './question.interfaces';

@Injectable()
export class QuestionsService {
  @InjectRepository(QuestionEntity)
  private readonly questionRepository: Repository<QuestionEntity>;

  @InjectRepository(TagEntity)
  private readonly tagsRepository: Repository<TagEntity>;

  @InjectRepository(AnswerEntity)
  private readonly answerRepository: Repository<AnswerEntity>;

  @InjectRepository(CommentEntity)
  private readonly commentRepository: Repository<CommentEntity>;

  @InjectRepository(OptionChoiceEntity)
  private readonly ocRepository: Repository<OptionChoiceEntity>;

  public async find(
    programId: string,
    searchOptions: QuestionSearchOption,
  ): Promise<QuestionsRO> {
    let qb = await this.questionRepository
      .createQueryBuilder('question')
      .select([
        'question.name AS name',
        'question.id AS id',
        'question.type AS type',
        'question.label::json AS label',
        'section.name AS "sectionName"',
        'section.id AS "sectionId"',
        'section.label::json AS "sectionLabel"',
        'subsection.id AS "subsectionId"',
        'subsection.name AS "subsectionName"',
        'answers.text as answer',
        'answers.updated as "answerUpdated"',
      ])
      .leftJoin('question.subsection', 'subsection')
      .leftJoin('subsection.section', 'section')
      .leftJoin(
        'question.answers',
        'answers',
        'answers.programId = :programId',
        {
          programId: programId,
        },
      )
      .leftJoin('question.tags', 'tags')
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
      .orderBy('section.orderPriority', 'ASC')
      .orderBy('subsection.orderPriority', 'ASC')
      .addOrderBy('question.orderPriority', 'ASC');
    if (searchOptions.section) {
      qb = qb.where('section.id = :section', {
        section: searchOptions.section,
      });
    }
    if (searchOptions.questionId) {
      qb = qb.where('question.id = :questionId', {
        questionId: searchOptions.questionId,
      });
    }
    if (searchOptions.tags) {
      if (typeof searchOptions.tags === 'string') {
        searchOptions.tags = [searchOptions.tags];
      }
      qb = qb
        .leftJoin('question.tags', 'tags_filter')
        .where('tags_filter.name IN (:...tags)', {
          tags: searchOptions.tags,
        })
        .addGroupBy('tags_filter');
    }

    const questions = await qb.getRawMany();

    for (const question of questions) {
      question.tags = await this.findTags(question);
      question.comments = await this.findComments(question, programId);
      question.optionChoices = await this.findOptionChoices(question);
    }

    return {
      questions: questions,
      count: questions.length,
    };
  }

  public async findOne(
    programId: string,
    questionId: string,
  ): Promise<QuestionEntity> {
    const result = await this.find(programId, { questionId: questionId });
    if (result.questions.length === 1) {
      return result.questions[0];
    }
  }

  private async findTags(question) {
    const qb = this.tagsRepository
      .createQueryBuilder('tag')
      .select(['to_json(array_agg(tag.name)) as tags'])
      .leftJoin('tag.questions', 'questions')
      .where('questions.id = :questionId', {
        questionId: question.id,
      });
    const result = await qb.getRawOne();
    return result.tags;
  }

  private async findComments(question: QuestionEntity, programId: string) {
    const qb = this.commentRepository
      .createQueryBuilder('comment')
      .select([
        'comment.text AS text',
        'comment.id AS id',
        'comment.updated AS updated',
        'comment.created AS created',
      ])
      .addSelect('"user"."userName"', 'userName')
      .leftJoin('comment.user', 'user')
      .leftJoin('comment.program', 'program')
      .leftJoin('comment.question', 'question')
      .where('question.id = :questionId', {
        questionId: question.id,
      })
      .andWhere('program.id = :programId', {
        programId: programId,
      })
      .orderBy('comment.created', 'ASC');
    return await qb.getRawMany();
  }

  private async findOptionChoices(question) {
    const qb = this.ocRepository
      .createQueryBuilder('optionChoices')
      .select([
        '"optionChoices".label::json AS label',
        '"optionChoices".id AS id',
        '"optionChoices".name AS name',
      ])
      .leftJoin('optionChoices.question', 'question')
      .where('question.id = :questionId', {
        questionId: question.id,
      })
      .orderBy('optionChoices.orderPriority', 'ASC');
    return await qb.getRawMany();
  }
}
