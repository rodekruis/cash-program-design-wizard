import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import * as programDemo from '../seed-data/program-demo.json';
import * as questionsSeed from '../seed-data/questions.json';
import * as sectionsSeed from '../seed-data/sections.json';
import { UserService } from '../users/user.service';
import { ProgramEntity } from './../programs/program.entity';
import { QuestionEntity } from './../questions/question.entity';
import { SectionEntity } from './../sections/section.entity';
import { UserRoleEnum } from './../users/enum/user-role.enum';
import { InterfaceScript } from './scripts.module';

@Injectable()
export class SeedDemoProgram implements InterfaceScript {
  @InjectRepository(ProgramEntity)
  private readonly programRepository: Repository<ProgramEntity>;

  @InjectRepository(SectionEntity)
  private readonly sectionRepository: Repository<SectionEntity>;

  @InjectRepository(QuestionEntity)
  private readonly questionRepository: Repository<QuestionEntity>;

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

    // ***** CREATE ADMIN USER *****
  }

  public async truncateAll(): Promise<void> {
    const entities = this.connection.entityMetadatas;
    try {
      for (const entity of entities) {
        const repository = await this.connection.getRepository(entity.name);
        if (repository.metadata.schema !== 'custom_migration_table') {
          const q = `TRUNCATE TABLE \"${entity.tableName}\" CASCADE;`;
          await repository.query(q);
        }
      }
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
  }

  private async seedProgram(): Promise<ProgramEntity> {
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
      role: UserRoleEnum.edit,
      programId: program.id,
    };
    await this.userService.assign(assignUserView);
  }

  private async seedSections() {
    const sections = [];
    for (const rawSection of sectionsSeed) {
      const section = new SectionEntity();
      section.label = rawSection.label
        ? JSON.stringify(rawSection.label)
        : null;
      section.name = rawSection.name;
      sections.push(section);
    }
    await this.sectionRepository.save(sections);
  }

  private async seedQuestions() {
    const questions = [];
    for (const rawQuestion of questionsSeed) {
      const question = new QuestionEntity();
      question.label = JSON.stringify(rawQuestion.label);
      question.name = rawQuestion.name;
      question.orderPriority = rawQuestion.orderPriority;
      question.orderPriority = rawQuestion.orderPriority;

      question.section = await this.sectionRepository.findOne({
        where: { name: rawQuestion.section },
      });
      questions.push(question);
    }
    await this.questionRepository.save(questions);
  }
}

export default SeedDemoProgram;
