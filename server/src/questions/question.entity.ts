import { TagEntity } from './../tags/tag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AnswerEntity } from '../answers/answer.entity';
import { CascadeDeleteEntity } from '../base.entity';
import { SectionEntity } from './../sections/section.entity';

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

  @ManyToMany(() => TagEntity, (tag) => tag.questions)
  @JoinTable()
  public tags: TagEntity[];
}
