import { Column, Entity, OneToMany } from 'typeorm';
import { AnswerEntity } from '../answers/answer.entity';
import { CascadeDeleteEntity } from '../base.entity';
import { CommentEntity } from '../comments/comment.entity';
import { ProgramUserAssignmentEntity } from './program-user-assignment.entity';

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

  @OneToMany(() => CommentEntity, (comment) => comment.program)
  public comments: CommentEntity[];

  @Column({ nullable: true })
  public narrativeReportTemplate: string;
}
