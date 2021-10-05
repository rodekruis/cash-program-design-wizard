import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/user.module';
import { AnswerEntity } from './answer.entity';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity]), UserModule],
  providers: [AnswersService],
  controllers: [AnswersController],
  exports: [AnswersService],
})
export class AnswersModule {}
