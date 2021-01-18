import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDTO } from '../../domain/dto/register.dto';
import { User } from '../../domain/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  
  public async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneOrFail({where: {email}});
  }

  public async createUser(user: RegisterDTO): Promise<User> {
    return this.userRepository.save(user);
  }
}