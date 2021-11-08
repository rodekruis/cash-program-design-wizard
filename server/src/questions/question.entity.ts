import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AnswerEntity } from '../answers/answer.entity';
import { CascadeDeleteEntity } from '../base.entity';
import { OptionChoiceEntity } from '../option-choices/option-choice.entity';
import { SubsectionEntity } from '../sub-sections/sub-section.entity';
import { CommentEntity } from './../comments/comment.entity';
import { TagEntity } from './../tags/tag.entity';

@Entity('question')
export class QuestionEntity extends CascadeDeleteEntity {
  @Column()
  @Index()
  public name: string;

  @Column()
  public label: string;

  @Column({ nullable: true })
  @Index()
  public type: string;

  @Column()
  public orderPriority: number;

  @ManyToOne(() => SubsectionEntity, (subsection) => subsection.questions)
  public subsection: SubsectionEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  public answers: AnswerEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.question)
  public comments: CommentEntity[];

  @OneToMany(() => OptionChoiceEntity, (optionChoice) => optionChoice.question)
  public optionChoices: OptionChoiceEntity[];

  @ManyToMany(() => TagEntity, (tag) => tag.questions)
  @JoinTable()
  public tags: TagEntity[];
}
