import { ProgramEntity } from './program.entity';

export interface ProgramsRO {
  programs: ProgramEntity[];
  count: number;
}
