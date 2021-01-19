import { RoleName } from '../enums//role.enum';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';
import { Entity, Column, DeepPartial, JoinTable, ManyToMany } from 'typeorm';

@Entity('role')
export class Role extends BaseEntity {
  @Column({ name: 'name', type: 'enum', enum: RoleName, nullable: false })
  public name: RoleName;

  @ManyToMany((type) => User, (user) => user.roles)
  @JoinTable()
  public users: User[];

  constructor(input?: DeepPartial<Role>) {
    super(input);
  }
}
