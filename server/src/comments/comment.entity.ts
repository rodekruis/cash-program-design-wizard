import { Column, Entity, ManyToOne } from 'typeorm';
import { CascadeDeleteEntity } from '../base.entity';
import { ProgramEntity } from '../programs/program.entity';
import { QuestionEntity } from '../questions/question.entity';
import { UserEntity } from './../users/user.entity';

@Entity('comment')
export class CommentEntity extends CascadeDeleteEntity {
  @Column()
  public text: string;

  @ManyToOne(() => ProgramEntity, (program) => program.comments)
  public program: ProgramEntity;

  @ManyToOne(() => QuestionEntity, (question) => question.comments)
  public question: QuestionEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  public user: UserEntity;
}
