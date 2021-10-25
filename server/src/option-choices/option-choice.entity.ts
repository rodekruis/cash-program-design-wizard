import { Column, Entity, ManyToOne } from 'typeorm';
import { CascadeDeleteEntity } from '../base.entity';
import { QuestionEntity } from '../questions/question.entity';

@Entity('option_choice')
export class OptionChoiceEntity extends CascadeDeleteEntity {
  @Column()
  public name: string;

  @Column()
  public label: string;

  @Column()
  public orderPriority: number;

  @ManyToOne(() => QuestionEntity, (question) => question.optionChoices)
  public question: QuestionEntity;
}
