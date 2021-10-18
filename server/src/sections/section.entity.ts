import { Column, Entity, OneToMany } from 'typeorm';
import { CascadeDeleteEntity } from '../base.entity';
import { SubsectionEntity } from '../sub-sections/sub-section.entity';

@Entity('section')
export class SectionEntity extends CascadeDeleteEntity {
  @Column()
  public name: string;

  @Column({ nullable: true })
  public label: string;

  @Column({ nullable: true })
  public orderPriority: number;

  @OneToMany(() => SubsectionEntity, (subQuestion) => subQuestion.section)
  public subsections: SubsectionEntity[];
}
