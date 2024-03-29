import {
  BeforeUpdate,
  Column,
  getConnection,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class BaseCpdwEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  public created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  public updated: Date;

  @BeforeUpdate()
  public updateTimestamp(): void {
    this.updated = new Date();
  }
}

export class CascadeDeleteEntity extends BaseCpdwEntity {
  // IMPORTANT: This function only works if you use .remove and not .delete
  public async deleteAllOneToMany(
    deleteList: CascadeDeleteInput[],
  ): Promise<void> {
    for (const i of deleteList) {
      await this.deleteOneToMany(i.entityClass, i.columnName);
    }
  }

  public async deleteOneToMany(entity: any, columnName: string): Promise<void> {
    const repo = getConnection().getRepository(entity);
    const deleteItems = await repo
      .createQueryBuilder('todelete')
      .where(`todelete.${columnName} = :removeId`, { removeId: this.id })
      .getMany();
    await repo.remove(deleteItems);
  }
}

class CascadeDeleteInput {
  public columnName: string;
  public entityClass: any;
}
