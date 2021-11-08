import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { narrativeReportTemplateDemoEn } from '../seed-data/narrativeReportTemplate-demo-en';
import * as programDemo from '../seed-data/program-demo.json';
import * as questionsSeed from '../seed-data/questions.json';
import * as sectionsSeed from '../seed-data/sections.json';
import * as subsectionsSeed from '../seed-data/subsections.json';
import { UserService } from '../users/user.service';
import { OptionChoiceEntity } from './../option-choices/option-choice.entity';
import { ProgramEntity } from './../programs/program.entity';
import { QuestionEntity } from './../questions/question.entity';
import { SectionEntity } from './../sections/section.entity';
import { SubsectionEntity } from './../sub-sections/sub-section.entity';
import { TagEntity } from './../tags/tag.entity';
import { UserRoleEnum } from './../users/enum/user-role.enum';
import { InterfaceScript } from './scripts.module';

@Injectable()
export class SeedDemoProgram implements InterfaceScript {
  @InjectRepository(ProgramEntity)
  private readonly programRepository: Repository<ProgramEntity>;

  @InjectRepository(SectionEntity)
  private readonly sectionRepository: Repository<SectionEntity>;

  @InjectRepository(SubsectionEntity)
  private readonly subsectionRepository: Repository<SubsectionEntity>;

  @InjectRepository(QuestionEntity)
  private readonly questionRepository: Repository<QuestionEntity>;

  @InjectRepository(TagEntity)
  private readonly tagRepository: Repository<TagEntity>;

  @InjectRepository(OptionChoiceEntity)
  private readonly optionChoiceRepository: Repository<OptionChoiceEntity>;

  public constructor(
    private readonly userService: UserService,
    private readonly connection: Connection,
  ) {}

  public async run(): Promise<void> {
    await this.truncateAll();

    const program = await this.seedProgram();
    await this.createUsers(program);
    await this.seedSections();
    await this.seedQuestions();
    console.log('Run SeedDemoProgram: done');
  }

  private async seedProgram(): Promise<ProgramEntity> {
    programDemo['narrativeReportTemplate'] = narrativeReportTemplateDemoEn;
    return await this.programRepository.save(programDemo);
  }

  private async createUsers(program: ProgramEntity): Promise<void> {
    const userEdit = await this.userService.create(
      process.env.USERCONFIG_EDIT_USERNAME,
      process.env.USERCONFIG_EDIT_PASSWORD,
    );
    const assignUserEdit = {
      userName: userEdit.user.userName,
      role: UserRoleEnum.edit,
      programId: program.id,
    };
    await this.userService.assign(assignUserEdit);

    const userView = await this.userService.create(
      process.env.USERCONFIG_VIEW_USERNAME,
      process.env.USERCONFIG_VIEW_PASSWORD,
    );
    const assignUserView = {
      userName: userView.user.userName,
      role: UserRoleEnum.view,
      programId: program.id,
    };
    await this.userService.assign(assignUserView);
  }

  private async seedSections() {
    const sections = [];
    for (const rawSection of sectionsSeed) {
      const section = new SectionEntity();
      section.orderPriority = rawSection.orderPriority;
      section.label = rawSection.label
        ? JSON.stringify(rawSection.label)
        : null;
      section.name = rawSection.name;
      sections.push(section);
    }
    await this.sectionRepository.save(sections);

    const subsections = [];
    for (const rawSubsection of subsectionsSeed) {
      const subsection = new SubsectionEntity();
      subsection.orderPriority = rawSubsection.orderPriority;
      subsection.name = rawSubsection.name;
      subsection.section = await this.sectionRepository.findOne({
        where: { name: rawSubsection.section },
      });
      subsections.push(subsection);
    }
    await this.subsectionRepository.save(subsections);
  }

  private async seedQuestions() {
    const questions = [];
    for (const rawQuestion of questionsSeed) {
      const question = new QuestionEntity();
      question.label = JSON.stringify(rawQuestion.label);
      question.name = rawQuestion.name;
      question.type = rawQuestion.type;
      question.orderPriority = rawQuestion.orderPriority;
      question.tags = await this.createOrGetTags(rawQuestion.tags);
      if (rawQuestion.optionChoices) {
        question.optionChoices = await this.createOptionChoices(
          rawQuestion.optionChoices,
        );
      }

      question.subsection = await this.subsectionRepository.findOne({
        where: { name: rawQuestion.subsection },
      });
      questions.push(question);
    }
    await this.questionRepository.save(questions);
  }

  private async createOrGetTags(tags: string[]): Promise<TagEntity[]> {
    const tagEntities = [];
    for (const tag of tags) {
      let tagEntity = await this.tagRepository.findOne({
        where: { name: tag },
      });
      if (!tagEntity) {
        tagEntity = new TagEntity();
        tagEntity.name = tag;
        tagEntity = await this.tagRepository.save(tagEntity);
      }
      tagEntities.push(tagEntity);
    }
    return tagEntities;
  }

  private async createOptionChoices(
    optionChoices: any[],
  ): Promise<OptionChoiceEntity[]> {
    const optionChoiceEntities = [];
    for (const optionChoice of optionChoices) {
      let optionChoiceEntity = new OptionChoiceEntity();
      optionChoiceEntity.label = JSON.stringify(optionChoice.label);
      optionChoiceEntity.name = optionChoice.name;
      optionChoiceEntity.orderPriority = optionChoice.orderPriority;
      optionChoiceEntity = await this.optionChoiceRepository.save(
        optionChoiceEntity,
      );
      optionChoiceEntities.push(optionChoiceEntity);
    }
    return optionChoiceEntities;
  }

  private async truncateAll(): Promise<void> {
    const entities = this.connection.entityMetadatas;
    try {
      for (const entity of entities) {
        const repository = await this.connection.getRepository(entity.name);

        const q = `TRUNCATE TABLE public."${entity.tableName}" CASCADE;`;
        await repository.query(q);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }
}

export default SeedDemoProgram;
