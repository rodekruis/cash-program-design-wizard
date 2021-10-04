import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';
import { SectionEntity } from './section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SectionEntity])],
  providers: [SectionsService],
  controllers: [SectionsController],
  exports: [SectionsService],
})
export class ProgramModule {}
