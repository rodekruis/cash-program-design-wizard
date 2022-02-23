import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectionEntity } from './../sections/section.entity';
import { ProgramDto } from './dto/program.dto';
import { ProgramEntity } from './program.entity';
import { ProgramsRO } from './program.interface';

@Injectable()
export class ProgramsService {
  @InjectRepository(ProgramEntity)
  private readonly programRepository: Repository<ProgramEntity>;

  @InjectRepository(SectionEntity)
  private readonly sectionRepository: Repository<SectionEntity>;

  public async findAll(userId: string): Promise<ProgramsRO> {
    const qb = await this.programRepository
      .createQueryBuilder('program')
      .select(['name', 'program.id as id', '"narrativeReportTemplate"'])
      .leftJoin('program.userAssignments', 'userAssignments')
      .leftJoin('userAssignments.user', 'user')
      .where('user.id = :userId', { userId: userId });
    const assignedPrograms = await qb.getRawMany();

    const sections = await this.sectionRepository.find({
      order: { orderPriority: 'ASC' },
    });
    const sectionIds = sections.map((s) => s.id);
    for (const program of assignedPrograms) {
      program.sectionIds = sectionIds;
    }

    return {
      programs: assignedPrograms,
      count: assignedPrograms.length,
    };
  }

  public async update(
    programId: string,
    payload: ProgramDto,
  ): Promise<ProgramEntity> {
    const program = await this.programRepository.findOne({
      where: {
        id: programId,
      },
    });

    if (!program) {
      throw new HttpException('Program not found', HttpStatus.NOT_FOUND);
    }

    if (payload.name) {
      program.name = payload.name;
    }

    if (payload.narrativeReportTemplate) {
      program.narrativeReportTemplate = payload.narrativeReportTemplate;
    }

    try {
      return await this.programRepository.save(program);
    } catch (error) {
      console.error('error: ', error);
      throw new HttpException('Program not updated', HttpStatus.BAD_REQUEST);
    }
  }
}
