import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parse } from 'csv-parse/sync';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { QuestionEntity } from '../questions/question.entity';
import { TagEntity } from '../tags/tag.entity';
import { OptionChoiceEntity } from './../option-choices/option-choice.entity';
import { ImportDataDto } from './dto/import-data.dto';
import { QuestionTransferDto } from './dto/question-tranfer.dto';

enum OptionChoiceNameEnum {
  name = 'optionChoice',
  label = 'optionChoiceLabelEn',
}

@Injectable()
export class TransferQuestionsService {
  @InjectRepository(QuestionEntity)
  private readonly questionRepository: Repository<QuestionEntity>;

  @InjectRepository(TagEntity)
  private readonly tagRepository: Repository<TagEntity>;

  @InjectRepository(OptionChoiceEntity)
  private readonly optionChoiceRepository: Repository<OptionChoiceEntity>;

  public constructor(private readonly connection: Connection) {}

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
      .groupBy('question.id')
      .addGroupBy('question.name')
      .addGroupBy('question.type')
      .addGroupBy('question.label')
      .addGroupBy('section.name')
      .addGroupBy('section.id')
      .addGroupBy('section.label')
      .addGroupBy('subsection.name')
      .addGroupBy('subsection.id')
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
        delimiter: [';'],
        skipEmptyLines: true,
        skipRecordsWithEmptyValues: true,
        trim: true,
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(
        `File could not be parsed.\n\nPotential cause: Make sure to save CSV with ';' separator'\n\n Details:${JSON.stringify(
          error,
        )}`,
        HttpStatus.UNAUTHORIZED,
      );
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
        tags: row.tags
          ? row.tags.split(',').map((item: string) => item.trim())
          : [],
        section: row.section,
        subSection: row.subsectionName,
        optionChoices: this.getOptionChoicesFromRow(row),
      };
    });

    const importData = {
      sections: Object.keys(importSections),
      subsections: Object.keys(importSubSections),
      questions: importQuestions,
    } as ImportDataDto;

    console.info('Imported Data: ', JSON.stringify(importData, null, 2));

    if (
      importData.sections.length < 1 ||
      importData.subsections.length < 1 ||
      importData.questions.length < 1
    ) {
      throw new HttpException(
        'Incorrect or mismatched data',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.insertUpdateImportData(importData);

    return {
      status: 'success',
      length: importData.questions.length,
    };
  }

  private getOptionChoicesFromRow(row: any): any {
    const optionChoices = [];
    let i = 0;
    let emptyOptionCellCount = 0;
    while (emptyOptionCellCount < 5) {
      const optionChoiceName = row[`${OptionChoiceNameEnum.name}${i + 1}`];
      const optionChoiceLabel = row[`${OptionChoiceNameEnum.label}${i + 1}`];
      const questionName = row['questionName'];
      if (!optionChoiceName && optionChoiceLabel) {
        const error = `Question '${questionName}': ${
          OptionChoiceNameEnum.name
        }${i + 1} is not filled in`;
        throw new HttpException(error, HttpStatus.UNAUTHORIZED);
      }
      if (optionChoiceName && !optionChoiceLabel) {
        const error = `Question '${questionName}': ${
          OptionChoiceNameEnum.label
        }${i + 1} is not filled in`;
        throw new HttpException(error, HttpStatus.UNAUTHORIZED);
      }

      // If a count of 5 options cannot be found break loop
      if (!optionChoiceName && !optionChoiceLabel) {
        emptyOptionCellCount++;
      }
      if (optionChoiceName && optionChoiceLabel) {
        optionChoices.push({
          name: optionChoiceName,
          label: {
            en: optionChoiceLabel,
          },
          questionName: questionName,
          orderPriority: i,
        });
      }
      i++;
    }
    return optionChoices;
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
    const qb = this.tagRepository
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

  private async insertUpdateImportData(importData: ImportDataDto) {
    const queryRunner = this.connection.createQueryRunner();
    queryRunner.startTransaction();
    await this.updateQuestions(importData.questions, queryRunner);
    queryRunner.commitTransaction();
  }

  private updateEntityWithImport(dbEntity: any, importEntry: any) {
    let changed = false;
    for (const key in dbEntity) {
      if (
        importEntry[key] !== undefined &&
        dbEntity[key] !== importEntry[key]
      ) {
        dbEntity[key] = importEntry[key];
        changed = true;
      }
    }
    return changed;
  }

  private async updateQuestions(importQuestions: any[], queryRunner) {
    for (const importQuestion of importQuestions) {
      const dbQuestion = await this.questionRepository.findOne({
        where: { name: importQuestion.name },
      });
      if (!dbQuestion) {
        const error = `Question with name: '${importQuestion.name}' does not exist`;
        throw new HttpException(error, HttpStatus.UNAUTHORIZED);
      }
      const changed = this.updateEntityWithImport(dbQuestion, importQuestion);
      // Do not save unchange entities so the update propery stays useful
      if (changed) {
        queryRunner.manager.save(dbQuestion);
      }
      if (importQuestion.optionChoices.length > 0) {
        await this.updateOptionsChoicesQuestion(
          importQuestion.optionChoices,
          queryRunner,
        );
      }
      await this.updateTagsForQuestion(
        importQuestion.tags,
        dbQuestion.name,
        queryRunner,
      );
    }
  }

  private async updateOptionsChoicesQuestion(
    importedOptionChoices,
    queryRunner,
  ) {
    const dbQuestion = await this.questionRepository.findOne({
      where: { name: importedOptionChoices[0].questionName },
      relations: ['optionChoices'],
    });
    for (const importedOptionChoice of importedOptionChoices) {
      const dbOptionChoice = dbQuestion.optionChoices.find(
        (dbOptionChoice) =>
          dbOptionChoice.orderPriority === importedOptionChoice.orderPriority,
      );
      if (dbOptionChoice) {
        const changed = this.updateEntityWithImport(
          dbOptionChoice,
          importedOptionChoice,
        );
        if (changed) {
          await queryRunner.manager.save(dbOptionChoice);
        }
      } else {
        const newOptionChoice = new OptionChoiceEntity();
        newOptionChoice.question = dbQuestion;
        newOptionChoice.label = importedOptionChoice.label;
        newOptionChoice.orderPriority = importedOptionChoice.orderPriority;
        newOptionChoice.name = importedOptionChoice.name;
        await queryRunner.manager.save(newOptionChoice);
      }
    }
    await this.removeOptionChoicesFromQ(
      importedOptionChoices,
      dbQuestion,
      queryRunner,
    );
  }

  private async removeOptionChoicesFromQ(
    importedOptionChoices,
    question,
    queryRunner: QueryRunner,
  ) {
    const orderProArrayImport = importedOptionChoices.map(
      (o) => o.orderPriority,
    );
    for (const dbOptionChoice of question.optionChoices) {
      if (!orderProArrayImport.includes(dbOptionChoice.orderPriority)) {
        await queryRunner.manager.remove(dbOptionChoice);
      }
    }
  }

  private async updateTagsForQuestion(
    importedTags: string[],
    dbQuestionName: string,
    queryRunner: QueryRunner,
  ) {
    const dbQuestion = await this.questionRepository.findOne({
      where: { name: dbQuestionName },
      relations: ['tags'],
    });

    let questionTagsChanged = false;
    for (const tag of importedTags) {
      const foundDbTag = dbQuestion.tags.find((dbTag) => dbTag.name === tag);
      if (!foundDbTag) {
        questionTagsChanged = true;
        const existingTag = await this.tagRepository.findOne({
          where: { name: tag },
        });
        if (existingTag) {
          dbQuestion.tags.push(existingTag);
        } else {
          throw new HttpException(
            `Tag not found '${tag}' at question: '${dbQuestionName}'`,
            HttpStatus.UNAUTHORIZED,
          );
          // const newTag = new TagEntity();
          // newTag.name = tag;
          // const savedTag = await queryRunner.manager.save(newTag);
          // dbQuestion.tags.push(savedTag);
        }
      }
      // Remove tags that are not in import
      const newRelatedTags = dbQuestion.tags.filter((dbTag) =>
        importedTags.includes(dbTag.name),
      );
      if (newRelatedTags.length < dbQuestion.tags.length) {
        dbQuestion.tags = newRelatedTags;

        questionTagsChanged = true;
      }
    }
    if (questionTagsChanged) {
      await queryRunner.manager.save(dbQuestion);
    }
  }
}
