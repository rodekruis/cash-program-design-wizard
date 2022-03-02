import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramEntity } from '../programs/program.entity';
import { AnswerEntity } from './../answers/answer.entity';
import { CommentEntity } from './../comments/comment.entity';
import { OptionChoiceEntity } from './../option-choices/option-choice.entity';
import { QuestionEntity } from './../questions/question.entity';
import { SectionEntity } from './../sections/section.entity';
import { SubsectionEntity } from './../sub-sections/sub-section.entity';
import { TagEntity } from './../tags/tag.entity';
import { UserEntity } from './../users/user.entity';
import { UserModule } from './../users/user.module';
import { ScriptsController } from './scripts.controller';
import SeedDemoProgram from './seed-program';
import { TransferQuestionsService } from './transfer-questions';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProgramEntity,
      TagEntity,
      SectionEntity,
      QuestionEntity,
      SectionEntity,
      SubsectionEntity,
      OptionChoiceEntity,
      UserEntity,
      AnswerEntity,
      CommentEntity,
    ]),
    UserModule,
  ],
  providers: [SeedDemoProgram, TransferQuestionsService],
  controllers: [ScriptsController],
})
export class ScriptsModule {}

export interface InterfaceScript {
  run(seed): Promise<void>;
}
