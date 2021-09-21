import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, Index } from 'typeorm';
import { CascadeDeleteEntity } from '../base.entity';

@Entity('user')
export class UserEntity extends CascadeDeleteEntity {
  @Index({ unique: true })
  @Column({ nullable: true })
  public username: string;

  @Column({ select: false })
  public password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(
      this.password,
      parseInt(process.env.SALT),
    );
  }
}
