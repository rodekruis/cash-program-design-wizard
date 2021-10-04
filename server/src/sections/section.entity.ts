import { QuestionEntity } from './../questions/question.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { CascadeDeleteEntity } from '../base.entity';

@Entity('section')
export class SectionEntity extends CascadeDeleteEntity {
  @Column()
  public name: string;

  @Column({ nullable: true })
  public label: string;

  @OneToMany(() => QuestionEntity, (question) => question.section)
  public questions: QuestionEntity[];
}
