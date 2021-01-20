import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from '../../domain/dto/login.dto';
import { LoginResponseDTO } from '../../domain/dto/loginResponse.dto';
import { RegisterDTO } from '../../domain/dto/register.dto';
import { User } from '../../domain/models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { CustomLoggerService } from './logger.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly customLoggerService: CustomLoggerService,
  ) {}

  async generateToken(user: User): Promise<string> {
    const payload = {
      user: {
        userName: `${user.firstname} ${user.lastname}`,
        email: user.email,
        roles: user.roles,
      },
      sub: user.id,
    };
    return await this.jwtService.sign(payload);
  }

  async toResponseObject(data: any): Promise<LoginResponseDTO> {
    const { email, token } = data;
    return { email, token };
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async login(payload: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this.userService.findUserByEmail(payload.email);

    if (!user) {
      this.customLoggerService.log(
        'Email used for login not found: ' + payload.email,
      );
      throw new HttpException(
        'Invalide username or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const correctPassword = await this.comparePassword(
      payload.password,
      user.password,
    );

    if (!correctPassword) {
      this.customLoggerService.log(
        'User credentials did not match: ' + payload.email,
      );
      throw new HttpException(
        'Invalide username or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.generateToken(user);

    this.customLoggerService.log('Logged in user with email: ' + payload.email);
    return this.toResponseObject({ ...user, token });
  }

  async register(payload: RegisterDTO): Promise<LoginResponseDTO> {
    let user = await this.userService.findUserByEmail(payload.email);
    Logger.warn(user);

    if (user) {
      this.customLoggerService.log(
        'Attempted login using email: ' + payload.email,
      );
      throw new HttpException(
        'There is an existin account using this email.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await this.hashPassword(payload.password);
    user = await this.userService.createUser({
      ...payload,
      password: hashedPassword,
    });
    const token = await this.generateToken(user);

    this.customLoggerService.log(
      'Registered and logged in user with email: ' + payload.email,
    );
    return this.toResponseObject({ ...user, token });
  }

  // async me(token: string): Promise<UserResponseDTO> {
  //   return this.toResponseObject({});
  // }
}
