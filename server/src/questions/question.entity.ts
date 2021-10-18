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
import { SubsectionEntity } from '../sub-sections/sub-section.entity';
import { TagEntity } from './../tags/tag.entity';

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

  @ManyToOne(() => SubsectionEntity, (subsection) => subsection.questions)
  public subsection: SubsectionEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  public answers: AnswerEntity[];

  @ManyToMany(() => TagEntity, (tag) => tag.questions)
  @JoinTable()
  public tags: TagEntity[];
}
