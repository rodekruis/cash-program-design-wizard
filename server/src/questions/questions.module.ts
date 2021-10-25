import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from '../tags/tag.entity';
import { UserModule } from '../users/user.module';
import { AnswerEntity } from './../answers/answer.entity';
import { CommentEntity } from './../comments/comment.entity';
import { OptionChoiceEntity } from './../option-choices/option-choice.entity';
import { QuestionEntity } from './question.entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionEntity,
      TagEntity,
      AnswerEntity,
      OptionChoiceEntity,
      CommentEntity,
    ]),
    UserModule,
  ],
  providers: [QuestionsService],
  controllers: [QuestionsController],
  exports: [QuestionsService],
})
export class QuestionsModule {}
