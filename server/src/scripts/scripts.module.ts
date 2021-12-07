import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramEntity } from '../programs/program.entity';
import { OptionChoiceEntity } from './../option-choices/option-choice.entity';
import { QuestionEntity } from './../questions/question.entity';
import { SectionEntity } from './../sections/section.entity';
import { SubsectionEntity } from './../sub-sections/sub-section.entity';
import { TagEntity } from './../tags/tag.entity';
import { UserEntity } from './../users/user.entity';
import { UserModule } from './../users/user.module';
import { ScriptsController } from './scripts.controller';
import SeedDemoProgram from './seed-program';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProgramEntity,
      TagEntity,
      SectionEntity,
      QuestionEntity,
      SubsectionEntity,
      OptionChoiceEntity,
      UserEntity,
    ]),
    UserModule,
  ],
  providers: [SeedDemoProgram],
  controllers: [ScriptsController],
})
export class ScriptsModule {}

export interface InterfaceScript {
  run(seed): Promise<void>;
}
