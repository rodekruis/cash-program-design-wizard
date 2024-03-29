import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionEntity } from './../sections/section.entity';
import { UserModule } from './../users/user.module';
import { ProgramUserAssignmentEntity } from './program-user-assignment.entity';
import { ProgramEntity } from './program.entity';
import { ProgramsController } from './programs.controller';
import { ProgramsService } from './programs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProgramEntity,
      ProgramUserAssignmentEntity,
      SectionEntity,
    ]),
    UserModule,
  ],
  providers: [ProgramsService],
  controllers: [ProgramsController],
  exports: [ProgramsService],
})
export class ProgramsModule {}
