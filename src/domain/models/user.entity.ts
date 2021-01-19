import { DeepPartial, Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Role } from './role.entity';

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

  @ManyToMany((type) => Role, (role) => role.users)
  public roles: Role[];
}
