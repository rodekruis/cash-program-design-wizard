import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parse } from 'csv-parse/sync';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { AnswerEntity } from '../answers/answer.entity';
import { CommentEntity } from '../comments/comment.entity';
import { QuestionEntity } from '../questions/question.entity';
import { SubsectionEntity } from '../sub-sections/sub-section.entity';
import { TagEntity } from '../tags/tag.entity';
import { OptionChoiceEntity } from './../option-choices/option-choice.entity';
import { SectionEntity } from './../sections/section.entity';
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

  @InjectRepository(SubsectionEntity)
  private readonly subsectionRepository: Repository<SubsectionEntity>;

  @InjectRepository(SectionEntity)
  private readonly sectionRepository: Repository<SectionEntity>;

  @InjectRepository(OptionChoiceEntity)
  private readonly optionChoiceRepository: Repository<OptionChoiceEntity>;

  @InjectRepository(AnswerEntity)
  private readonly answerRepository: Repository<AnswerEntity>;

  @InjectRepository(CommentEntity)
  private readonly commentRepository: Repository<CommentEntity>;

  public constructor(private readonly connection: Connection) {}

  public async export(): Promise<QuestionTransferDto[]> {
    const questions = (await this.questionRepository
      .createQueryBuilder('question')
      .select([
        'section.name AS "sectionName"',
        'section.orderPriority AS "sectionOrderPriority"',
        `section.label::json->'en' AS "sectionLabelEn"`,
        'subsection.name AS "subsectionName"',
        'subsection.orderPriority AS "subsectionOrderPriority"',
        'question.name AS "questionName"',
        'question.type AS "questionType"',
        `question.label::json->'en' AS "questionLabelEn"`,
        `question.orderPriority as "orderPriority"`,
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
      .addGroupBy('section.orderPriority')
      .addGroupBy('subsection.name')
      .addGroupBy('subsection.id')
      .addGroupBy('subsection.orderPriority')
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
    console.log('Starting import...');
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
        HttpStatus.BAD_REQUEST,
      );
    }

    const nameKeySubsections = 'subsectionName';
    const keysSubsections = ['subsectionOrderPriority', 'sectionName'].concat([
      nameKeySubsections,
    ]);
    const uniqueSubsections = this.checkAnySectionRows(
      records,
      nameKeySubsections,
      keysSubsections,
    );

    const nameKeySections = 'sectionName';
    const keysSections = ['sectionOrderPriority', 'sectionLabelEn'].concat([
      nameKeySections,
    ]);
    const uniqueSections = this.checkAnySectionRows(
      records,
      nameKeySections,
      keysSections,
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
      sections: uniqueSections,
      subsections: uniqueSubsections,
      questions: importQuestions,
    } as ImportDataDto;

    // console.info('Imported Data: ', JSON.stringify(importData, null, 2));

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

    console.log('Import succesfully completed...');
    return {
      status: 'success',
      length: importData.questions.length,
    };
  }

  private async insertUpdateSections(
    sections: any[],
    queryrunner: QueryRunner,
  ) {
    const sectionKeys = ['orderPriority', 'label'];
    for (const section of sections) {
      const mappedSection = {
        name: section['sectionName'],
        label: JSON.stringify({
          en: section['sectionLabelEn'],
        }),
        orderPriority: section['sectionOrderPriority'],
      };

      const dbSection = await this.sectionRepository.findOne({
        where: { name: mappedSection.name },
      });
      if (dbSection) {
        const changed = this.updateEntityWithImport(
          dbSection,
          mappedSection,
          sectionKeys,
        );
        if (changed) {
          await this.sectionRepository.save(dbSection);
        }
      } else {
        const transactionSectionRepository =
          queryrunner.manager.getRepository(SectionEntity);
        const s = await transactionSectionRepository.save(mappedSection);
        console.log('s: ', s);
      }
    }
  }

  private async insertUpdateSubsections(
    subsections: any[],
    queryrunner: QueryRunner,
  ) {
    const transactionSectionRepository =
      queryrunner.manager.getRepository(SectionEntity);
    const subsectionKeys = ['orderPriority'];
    for (const subsection of subsections) {
      const mappedSubsection = {
        name: subsection['subsectionName'],
        orderPriority: subsection['subsectionOrderPriority'],
        section: null,
      };

      const dbSubsection = await this.subsectionRepository.findOne({
        where: { name: mappedSubsection.name },
      });
      if (dbSubsection) {
        const changed = this.updateEntityWithImport(
          dbSubsection,
          mappedSubsection,
          subsectionKeys,
        );
        if (changed) {
          await this.sectionRepository.save(dbSubsection);
        }
      } else {
        const transactionSubsectionRepository =
          queryrunner.manager.getRepository(SubsectionEntity);

        const section = await transactionSectionRepository.findOne({
          where: { name: subsection.sectionName },
        });

        mappedSubsection.section = section;

        const r = await transactionSubsectionRepository.save(mappedSubsection);
        const r2 = await transactionSubsectionRepository.findOne(r.id);
        console.log('r2: ', r2);
      }
    }
  }

  private checkAnySectionRows(
    rows: any[],
    nameKey: string,
    sectionKeys: string[],
  ) {
    const uniqueAnySection = {};
    for (const [i, row] of rows.entries()) {
      const sectionFromImport = this.filterObjectPropertiesByArray(
        sectionKeys,
        row,
      );
      sectionFromImport['i'] = i;
      if (uniqueAnySection[row[nameKey]]) {
        this.checkSimilarityAnySection(
          i,
          uniqueAnySection[row[nameKey]],
          sectionFromImport,
          sectionKeys,
        );
      } else {
        uniqueAnySection[row[nameKey]] = sectionFromImport;
      }
    }
    return Object.values(uniqueAnySection);
  }

  private filterObjectPropertiesByArray(filterArray: string[], object: any) {
    const newObj = {};
    for (const val of filterArray) {
      newObj[val] = object[val];
    }
    return newObj;
  }

  private checkSimilarityAnySection(
    i: number,
    earlierFoundSection: any,
    newlyFoundSection: any,
    keys: string[],
  ) {
    for (const key of keys) {
      if (earlierFoundSection[key] !== newlyFoundSection[key]) {
        throw new HttpException(
          `(Sub)section in row ${i + 2} has different value than in row ${
            earlierFoundSection['i'] + 2
          } in column ${key}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
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
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
      if (optionChoiceName && !optionChoiceLabel) {
        const error = `Question '${questionName}': ${
          OptionChoiceNameEnum.label
        }${i + 1} is not filled in`;
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
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
    await this.insertUpdateSections(importData.sections, queryRunner);
    console.log('insertUpdateSections: ');
    await this.insertUpdateSubsections(importData.subsections, queryRunner);
    console.log('insertUpdateSubsections: ');
    await this.updateQuestions(importData.questions, queryRunner);
    console.log('updateQuestions: ');
    queryRunner.commitTransaction();
  }

  private updateEntityWithImport(
    dbEntity: any,
    importEntry: any,
    keys: string[],
  ) {
    let changed = false;
    for (const key of keys) {
      if (
        importEntry[key] !== undefined &&
        dbEntity[key] !== importEntry[key] &&
        !Array.isArray(importEntry[key])
      ) {
        dbEntity[key] = importEntry[key];
        changed = true;
      }
    }
    return changed;
  }

  private async updateQuestions(importQuestions: any[], queryRunner) {
    for (const importQuestion of importQuestions) {
      let dbQuestion = await this.questionRepository.findOne({
        where: { name: importQuestion.name },
        relations: ['tags', 'optionChoices', 'subsection'],
      });
      if (!dbQuestion) {
        dbQuestion = new QuestionEntity();
        dbQuestion.name = importQuestion.name;
        dbQuestion.orderPriority = importQuestion.orderPriority;
        dbQuestion.label = importQuestion.label;
        dbQuestion.type = importQuestion.type;
        dbQuestion.tags = [];
        dbQuestion.optionChoices = [];
      }
      const changed = this.updateEntityWithImport(dbQuestion, importQuestion, [
        'type',
        'label',
        'orderPriority',
      ]);
      // Do not save unchange entities so the update propery stays useful
      if (changed) {
        await queryRunner.manager.save(dbQuestion);
      }
      if (importQuestion.optionChoices.length > 0) {
        await this.updateOptionsChoicesQuestion(
          importQuestion.optionChoices,
          dbQuestion,
          queryRunner,
        );
      }
      await this.updateTagsForQuestion(
        JSON.parse(JSON.stringify(importQuestion.tags)),
        dbQuestion,
        queryRunner,
      );
      await this.updateSubsectionForQ(
        importQuestion.subSection,
        dbQuestion,
        queryRunner,
      );
    }
  }

  private async updateOptionsChoicesQuestion(
    importedOptionChoices,
    dbQuestion: QuestionEntity,
    queryRunner: QueryRunner,
  ) {
    for (const importedOptionChoice of importedOptionChoices) {
      const dbOptionChoice = dbQuestion.optionChoices.find(
        (dbOptionChoice) =>
          dbOptionChoice.orderPriority === importedOptionChoice.orderPriority,
      );
      if (dbOptionChoice) {
        const changed = this.updateEntityWithImport(
          dbOptionChoice,
          importedOptionChoice,
          ['label', 'orderPriority'],
        );
        if (changed) {
          await queryRunner.manager.save(dbOptionChoice);
        }
      } else {
        const newOptionChoice = new OptionChoiceEntity();
        dbQuestion.optionChoices.push(newOptionChoice);
        newOptionChoice.label = importedOptionChoice.label;
        newOptionChoice.orderPriority = importedOptionChoice.orderPriority;
        newOptionChoice.name = importedOptionChoice.name;
        const newOptionChoiceSaved = await queryRunner.manager.save(
          newOptionChoice,
        );
        dbQuestion.optionChoices.push(newOptionChoiceSaved);
        await queryRunner.manager.save(dbQuestion);
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
    const orderPrioArrayImport = importedOptionChoices.map(
      (o) => o.orderPriority,
    );
    for (const dbOptionChoice of question.optionChoices) {
      if (!orderPrioArrayImport.includes(dbOptionChoice.orderPriority)) {
        await queryRunner.manager.remove(dbOptionChoice);
      }
    }
  }

  private async updateTagsForQuestion(
    importedTags: string[],
    dbQuestion: QuestionEntity,
    queryRunner: QueryRunner,
  ) {
    let questionTagsChanged = false;
    for (const importTag of importedTags) {
      const foundDbTag = dbQuestion.tags.find(
        (dbTag) => dbTag.name === importTag,
      );
      if (!foundDbTag) {
        questionTagsChanged = true;
        const existingTag = await this.tagRepository.findOne({
          where: { name: importTag },
        });
        if (existingTag) {
          dbQuestion.tags.push(existingTag);
        } else {
          const newTag = new TagEntity();
          newTag.name = importTag;
          dbQuestion.tags.push(newTag);
        }
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
    if (questionTagsChanged) {
      await queryRunner.manager.save(dbQuestion);
    }
  }

  private async updateSubsectionForQ(
    importSubsectionName: string,
    dbQuestion: QuestionEntity,
    queryRunner: QueryRunner,
  ) {
    const subsection = await queryRunner.manager
      .getRepository(SubsectionEntity)
      .findOne({
        where: { name: importSubsectionName },
      });
    if (!subsection) {
      throw new HttpException(
        `Subsection does not exist: '${importSubsectionName}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      !dbQuestion.subsection ||
      dbQuestion.subsection.name !== importSubsectionName
    ) {
      dbQuestion.subsection = subsection;
      await queryRunner.manager.save(dbQuestion);
    }
  }

  public async deleteQuestion(questionName: string) {
    const question = await this.questionRepository.findOne({
      where: { name: questionName },
      relations: ['answers', 'comments', 'optionChoices'],
    });

    if (!question) {
      throw new HttpException(
        `Question not found: '${questionName}''`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.answerRepository.remove(question.answers);
    await this.commentRepository.remove(question.comments);
    await this.optionChoiceRepository.remove(question.optionChoices);
    await this.questionRepository.remove(question);

    return {
      status: 'success',
      name: questionName,
    };
  }
}
