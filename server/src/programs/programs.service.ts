import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramEntity } from './program.entity';
import { ProgramsRO } from './program.interface';

@Injectable()
export class ProgramsService {
  @InjectRepository(ProgramEntity)
  private readonly programRepository: Repository<ProgramEntity>;

  public async findAll(userId: number): Promise<ProgramsRO> {
    const qb = await this.programRepository
      .createQueryBuilder('program')
      .select(['name', 'program.id as id'])
      .leftJoin('program.userAssignments', 'userAssignments')
      .leftJoin('userAssignments.user', 'user')
      .where('user.id = :userId', { userId: userId });
    const assignedPrograms = await qb.getRawMany();

    return {
      programs: assignedPrograms,
      count: assignedPrograms.length,
    };
  }
}
