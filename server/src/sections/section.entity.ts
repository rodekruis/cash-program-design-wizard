import { Column, Entity, OneToMany } from 'typeorm';
import { CascadeDeleteEntity } from '../base.entity';
import { QuestionEntity } from './../questions/question.entity';

@Entity('section')
export class SectionEntity extends CascadeDeleteEntity {
  @Column()
  public name: string;

  @Column({ nullable: true })
  public label: string;

  @OneToMany(() => QuestionEntity, (question) => question.section)
  public questions: QuestionEntity[];
}
