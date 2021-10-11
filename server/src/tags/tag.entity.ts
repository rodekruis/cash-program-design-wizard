import { Column, Entity, ManyToMany } from 'typeorm';
import { CascadeDeleteEntity } from '../base.entity';
import { QuestionEntity } from '../questions/question.entity';

@Entity('tag')
export class TagEntity extends CascadeDeleteEntity {
  @Column()
  public name: string;

  @ManyToMany(() => QuestionEntity, (question) => question.answers)
  public question: QuestionEntity;
}
