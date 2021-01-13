import { DeepPartial, Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('user')
export class User extends BaseEntity {
  constructor(input?: DeepPartial<User>) {
    super(input);
  }

  @Column({ name: 'firstname' })
  public firstname: string;

  @Column({ name: 'lastname' })
  public lastname: string;

  @Column({ name: 'email' })
  public email: string;

  @Column({ name: 'password' })
  public password: string;

  @Column({ name: 'salt' })
  public salt: string;
}