import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CascadeDeleteEntity } from '../base.entity';
import { QuestionEntity } from '../questions/question.entity';
import { SectionEntity } from '../sections/section.entity';

@Entity('sub_section')
export class SubsectionEntity extends CascadeDeleteEntity {
  @Column()
  public name: string;

  @Column({ nullable: true })
  public orderPriority: number;

  @ManyToOne(() => SectionEntity, (section) => section.subsections)
  public section: SectionEntity;

  @OneToMany(() => QuestionEntity, (question) => question.subsection)
  public questions: QuestionEntity[];
}
