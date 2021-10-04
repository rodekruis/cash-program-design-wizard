import { UserModule } from './../users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProgramEntity } from './program.entity';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { ProgramUserAssignmentEntity } from './program-user-assignment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProgramEntity, ProgramUserAssignmentEntity]),
    UserModule,
  ],
  providers: [ProgramsService],
  controllers: [ProgramsController],
  exports: [ProgramsService],
})
export class ProgramsModule {}
