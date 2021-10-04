import { AnswerEntity } from '../answers/answer.entity';
import { ProgramUserAssignmentEntity } from './program-user-assignment.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { CascadeDeleteEntity } from '../base.entity';

@Entity('program')
export class ProgramEntity extends CascadeDeleteEntity {
  @Column()
  public name: string;

  @OneToMany(
    () => ProgramUserAssignmentEntity,
    (assignment) => assignment.program,
  )
  public userAssignments: ProgramUserAssignmentEntity[];

  @OneToMany(() => AnswerEntity, (answer) => answer.program)
  public answers: AnswerEntity[];
}
