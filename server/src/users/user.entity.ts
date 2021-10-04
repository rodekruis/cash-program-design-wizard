import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, Index, OneToMany } from 'typeorm';
import { CascadeDeleteEntity } from '../base.entity';
import { ProgramUserAssignmentEntity } from '../programs/program-user-assignment.entity';

@Entity('user')
export class UserEntity extends CascadeDeleteEntity {
  @Index({ unique: true })
  @Column({ nullable: true })
  public userName: string;

  @Column({ select: false })
  public password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(
      this.password,
      parseInt(process.env.SALT),
    );
  }

  @OneToMany(
    () => ProgramUserAssignmentEntity,
    (programAssignment) => programAssignment.user,
  )
  public programAssignments: ProgramUserAssignmentEntity[];
}
