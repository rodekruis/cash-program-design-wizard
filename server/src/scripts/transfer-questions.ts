import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parse } from 'csv-parse/sync';
import { Repository } from 'typeorm';
import { OptionChoiceEntity } from '../option-choices/option-choice.entity';
import { QuestionEntity } from '../questions/question.entity';
import { TagEntity } from '../tags/tag.entity';
import { UserService } from '../users/user.service';
import { QuestionTransferDto } from './dto/question-tranfer.dto';

@Injectable()
export class TransferQuestionsService {
  @InjectRepository(QuestionEntity)
  private readonly questionRepository: Repository<QuestionEntity>;

  @InjectRepository(TagEntity)
  private readonly tagsRepository: Repository<TagEntity>;

  @InjectRepository(OptionChoiceEntity)
  private readonly optionChoiceRepository: Repository<OptionChoiceEntity>;

  public constructor(private readonly userService: UserService) {}

  public async export(): Promise<QuestionTransferDto[]> {
    const questions = (await this.questionRepository
      .createQueryBuilder('question')
      .select([
        'section.name AS "section"',
        'subsection.name AS "subsectionName"',
        'question.name AS "questionName"',
        'question.type AS "questionType"',
        `question.label::json->'en' AS "questionLabelEn"`,
        `question.orderPriority as orderPriority`,
      ])
      .leftJoin('question.subsection', 'subsection')
      .leftJoin('subsection.section', 'section')
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
      .addSelect(`array_agg(distinct(tags.name::character varying))`, 'tags')
      .orderBy('section.orderPriority', 'ASC')
      .orderBy('subsection.orderPriority', 'ASC')
      .addOrderBy('question.orderPriority', 'ASC')
      .leftJoin('question.tags', 'tags_filter')
      .addGroupBy('tags_filter')
      .getRawMany()) as QuestionTransferDto[];

    for (let question of questions) {
      question.tags = await this.findTags(question);
      question = await this.findOptionChoices(question);
    }
    return questions;
  }

  public async import(file: Buffer): Promise<{
    status: string;
    length?: number;
    error?: any;
  }> {
    let records;

    try {
      records = parse(file, {
        cast: true,
        columns: true,
        delimiter: [';', ','],
        skipEmptyLines: true,
        skipRecordsWithEmptyValues: true,
        trim: true,
      });
    } catch (error) {
      console.error(error);
      return {
        status: 'error',
        error,
      };
    }

    const importSections = this.extractUniqueProperty(records, 'section');
    const importSubSections = this.extractUniqueProperty(
      records,
      'subsectionName',
    );
    const importQuestions = records.map((row) => {
      return {
        name: row.questionName,
        type: row.questionType,
        label: {
          en: row.questionLabelEn,
        },
        orderPriority: row.orderPriority,
        tags: row.tags ? row.tags.split(',') : [],
        section: row.section,
        subSection: row.subsectionName,
      };
    });

    const importData = {
      sections: Object.keys(importSections),
      subsections: Object.keys(importSubSections),
      questions: importQuestions,
    };

    console.info('Imported Data: ', JSON.stringify(importData, null, 2));

    if (
      importData.sections.length < 1 ||
      importData.subsections.length < 1 ||
      importData.questions.length < 1
    ) {
      return {
        status: 'error',
        error: {
          message: 'Incorrect or mismatched data',
        },
      };
    }

    // TODO: Perform actual import into database here.

    return {
      status: 'success',
      length: importData.questions.length,
    };
  }

  private extractUniqueProperty(array: any[], property: string) {
    return array.reduce(
      (previous, current) => (
        (previous[current[property]] = ++previous[current[property]] || 1),
        previous
      ),
      {},
    );
  }

  private async findTags(question): Promise<string> {
    const qb = this.tagsRepository
      .createQueryBuilder('tag')
      .select(['to_json(array_agg(tag.name)) as tags'])
      .leftJoin('tag.questions', 'questions')
      .where('questions.name = :name', {
        name: question.questionName,
      });
    const result = await qb.getRawOne();
    return result.tags ? result.tags.toString() : '';
  }

  private async findOptionChoices(question): Promise<QuestionTransferDto> {
    const qb = this.optionChoiceRepository
      .createQueryBuilder('optionChoices')
      .select([
        '"optionChoices".label::json AS label',
        '"optionChoices".id AS id',
        '"optionChoices".name AS name',
      ])
      .leftJoin('optionChoices.question', 'question')
      .where('question.name = :name', {
        name: question.questionName,
      })
      .orderBy('optionChoices.orderPriority', 'ASC');

    const optionChoices = await qb.getRawMany();
    for (const [i, choice] of optionChoices.entries()) {
      question[`optionChoice${i + 1}`] = choice.name;
      question[`optionChoiceLabelEn${i + 1}`] = choice.label['en'];
    }
    return question;
  }
}
