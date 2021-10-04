import { SectionEntity } from './../sections/section.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CascadeDeleteEntity } from '../base.entity';
import { AnswerEntity } from '../answers/answer.entity';

@Entity('question')
export class QuestionEntity extends CascadeDeleteEntity {
  @Column()
  public name: string;

  @Column()
  public label: string;

  @Column({ nullable: true })
  public type: string;

  @Column()
  public orderPriority: number;

  @ManyToOne(() => SectionEntity, (section) => section.questions)
  public section: SectionEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  public answers: AnswerEntity[];
}
