import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionEntity } from './section.entity';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';

@Module({
  imports: [TypeOrmModule.forFeature([SectionEntity])],
  providers: [SectionsService],
  controllers: [SectionsController],
  exports: [SectionsService],
})
export class ProgramModule {}
