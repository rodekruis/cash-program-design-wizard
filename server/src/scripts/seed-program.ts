import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as generatePassword from 'password-generator';
import { Connection, Repository } from 'typeorm';
import { OptionChoiceEntity } from '../option-choices/option-choice.entity';
import { ProgramEntity } from '../programs/program.entity';
import { QuestionEntity } from '../questions/question.entity';
import { SectionEntity } from '../sections/section.entity';
import { narrativeReportTemplateDemoEn } from '../seed-data/narrativeReportTemplate-demo-en';
import { narrativeReportTemplateTestEn } from '../seed-data/narrativeReportTemplate-test-en';
import * as programDemo from '../seed-data/program-demo.json';
import * as programTest from '../seed-data/program-test.json';
import * as questionsSeedTest from '../seed-data/questions-test.json';
import * as questionsSeed from '../seed-data/questions.json';
import * as sectionsSeedTest from '../seed-data/sections-test.json';
import * as sectionsSeed from '../seed-data/sections.json';
import * as subsectionsSeedTest from '../seed-data/subsections-test.json';
import * as subsectionsSeed from '../seed-data/subsections.json';
import { SubsectionEntity } from '../sub-sections/sub-section.entity';
import { TagEntity } from '../tags/tag.entity';
import { UserRoleEnum } from '../users/enum/user-role.enum';
import { UserEntity } from '../users/user.entity';
import { UserService } from '../users/user.service';
import { SeedScript } from './scripts.controller';
import { InterfaceScript } from './scripts.module';

class SeedInput {
  sections: any;
  subsections: any;
  questions: any;
  program: {
    [_property: string]: any;
    narrativeReportTemplate: string;
  };
  users: any;
}

export enum Program {
  test = 'test',
  demo = 'demo',
}

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

  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  public constructor(
    private readonly userService: UserService,
    private readonly connection: Connection,
  ) {}

  public async run(environment: SeedScript, stagingAmount = 50): Promise<any> {
    const inputArray = this.setInput(environment, stagingAmount);

    // Do not await or swagger request times out
    this.seedInput(inputArray);

    console.log('SeedDemoProgram done');
    return inputArray.map((input) => input.users);
  }

  private async seedInput(inputArray: SeedInput[]) {
    await this.truncateAll();
    let seedSectionsQuestions = true;
    for (const input of inputArray) {
      const programEntity = await this.seedProgram(input);
      await this.createUsers(programEntity, input);
      if (seedSectionsQuestions) {
        await this.seedSections(input);
        await this.seedQuestions(input);
        seedSectionsQuestions = false;
      }
    }
    console.log('SeedDemoProgram done');
  }

  private setInput(seedScript: string, stagingAmount): SeedInput[] {
    if (seedScript === SeedScript.dev) {
      return [
        {
          sections: sectionsSeedTest,
          subsections: subsectionsSeedTest,
          questions: questionsSeedTest,
          program: {
            ...programTest,
            narrativeReportTemplate: narrativeReportTemplateTestEn,
          },
          users: {
            edit: {
              username: process.env.USERCONFIG_EDIT_USERNAME,
              password: process.env.USERCONFIG_EDIT_PASSWORD,
            },
            view: {
              username: process.env.USERCONFIG_VIEW_USERNAME,
              password: process.env.USERCONFIG_VIEW_PASSWORD,
            },
          },
        },
      ];
    }
    if (seedScript === SeedScript.staging) {
      const inputArray = [];
      let i = 0;
      while (i <= stagingAmount) {
        i++;
        const programDemoInput = JSON.parse(JSON.stringify(programDemo));
        const input = {
          sections: sectionsSeed,
          subsections: subsectionsSeed,
          questions: questionsSeed,
          program: {
            name: `${programDemoInput.name}${i}`,
            narrativeReportTemplate: narrativeReportTemplateDemoEn,
          },
          users: {
            edit: {
              username: `${
                process.env.USERCONFIG_EDIT_USERNAME.split('@')[0]
              }${i}@${process.env.USERCONFIG_EDIT_USERNAME.split('@')[1]}`,
              password: i === 1 ? 'password' : generatePassword(5),
            },
            view: {
              username: `${
                process.env.USERCONFIG_VIEW_USERNAME.split('@')[0]
              }${i}@${process.env.USERCONFIG_VIEW_USERNAME.split('@')[1]}`,
              password: i === 1 ? 'password' : generatePassword(5),
            },
          },
        };
        inputArray.push(input);
      }
      return inputArray;
    }
  }

  private async seedProgram(seedInput: SeedInput): Promise<ProgramEntity> {
    console.log(`SeedDemoProgram: Seeding program: ${seedInput.program.name}`);
    return await this.programRepository.save(seedInput.program);
  }

  private async createUsers(
    program: ProgramEntity,
    seedInput: SeedInput,
  ): Promise<void> {
    const userView = await this.userService.create(
      seedInput.users.view.username,
      seedInput.users.view.password,
    );

    this.userService.assign({
      userName: userView.user.userName,
      role: UserRoleEnum.view,
      programId: program.id,
    });

    const userEdit = await this.userService.create(
      seedInput.users.edit.username,
      seedInput.users.edit.password,
    );

    this.userService.assign({
      userName: userEdit.user.userName,
      role: UserRoleEnum.edit,
      programId: program.id,
    });
  }

  private async seedSections(seedInput: SeedInput) {
    const sections = [];
    for (const rawSection of seedInput.sections) {
      const foundSection = await this.sectionRepository.findOne({
        where: { name: rawSection.name },
      });
      if (!foundSection) {
        const section = new SectionEntity();
        section.orderPriority = rawSection.orderPriority;
        section.label = rawSection.label
          ? JSON.stringify(rawSection.label)
          : null;
        section.name = rawSection.name;
        sections.push(section);
      }
    }
    console.log(
      `SeedDemoProgram: Seeding ${sections.length} sections: ${sections
        .map((s) => s.name)
        .join(', ')}`,
    );
    await this.sectionRepository.save(sections);

    const subsections = [];
    for (const rawSubsection of seedInput.subsections) {
      const foundSubSection = await this.subsectionRepository.findOne({
        where: { name: rawSubsection.name },
      });
      if (!foundSubSection) {
        const subsection = new SubsectionEntity();
        subsection.orderPriority = rawSubsection.orderPriority;
        subsection.name = rawSubsection.name;
        subsection.section = await this.sectionRepository.findOne({
          where: { name: rawSubsection.section },
        });
        subsections.push(subsection);
      }
    }
    console.log(
      `SeedDemoProgram: Seeding ${
        subsections.length
      } sub-sections: ${subsections.map((s) => s.name).join(', ')}`,
    );
    await this.subsectionRepository.save(subsections);
  }

  private async seedQuestions(seedInput: SeedInput) {
    const questions = [];
    for (const rawQuestion of seedInput.questions) {
      const foundQuestion = await this.questionRepository.findOne({
        where: { name: rawQuestion.name },
      });
      if (!foundQuestion) {
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
    }
    console.log(`SeedDemoProgram: Seeding ${questions.length} questions`);
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
