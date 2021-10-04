import { Column, Entity, ManyToOne } from 'typeorm';
import { CascadeDeleteEntity } from '../base.entity';

import { UserRoleEnum } from '../users/enum/user-role.enum';
import { UserEntity } from '../users/user.entity';
import { ProgramEntity } from './program.entity';

@Entity('program_user_assignment')
export class ProgramUserAssignmentEntity extends CascadeDeleteEntity {
  @ManyToOne(() => UserEntity, (user) => user.programAssignments)
  public user: UserEntity;

  @ManyToOne(() => ProgramEntity, (program) => program.userAssignments)
  public program: ProgramEntity;

  @Column({ nullable: true })
  public role: UserRoleEnum;
}
