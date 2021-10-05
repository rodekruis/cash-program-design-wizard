import { Column, Entity, ManyToOne } from 'typeorm';
import { CascadeDeleteEntity } from '../base.entity';
import { QuestionEntity } from '../questions/question.entity';
import { ProgramEntity } from './../programs/program.entity';

@Entity('answer')
export class AnswerEntity extends CascadeDeleteEntity {
  @Column()
  public text: string;

  @ManyToOne(() => ProgramEntity, (program) => program.answers)
  public program: ProgramEntity;

  @ManyToOne(() => QuestionEntity, (question) => question.answers)
  public question: QuestionEntity;
}
