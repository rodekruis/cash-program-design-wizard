import { QuestionEntity } from './../questions/question.entity';
import { SectionEntity } from './../sections/section.entity';
import { UserModule } from './../users/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScriptsController } from './scripts.controller';

import SeedDemoProgram from './seed-program-demo';
import { ProgramEntity } from '../programs/program.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProgramEntity, SectionEntity, QuestionEntity]),
    UserModule,
  ],
  providers: [SeedDemoProgram],
  controllers: [ScriptsController],
})
export class ScriptsModule {}

export interface InterfaceScript {
  run(): Promise<void>;
}
