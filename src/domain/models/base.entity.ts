import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeepPartial,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime', nullable: false })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime', nullable: false })
  public updatedAt: Date;

  protected constructor(input?: DeepPartial<BaseEntity>) {
    if (input) {
      for (const [key, value] of Object.entries(input)) {
        this[key] = value;
      }
    }
  }
}