import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginResponseDTO } from '../../domain/dto/loginResponse.dto';
import { LoginDTO } from '../../domain/dto/login.dto';
import { RegisterDTO } from '../../domain/dto/register.dto';
import { AuthService } from '../../infrastructure/services/auth.service';

@Controller('')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('/login')
  login(@Body() payload: LoginDTO): Promise<LoginResponseDTO> {
    return this.authService.login(payload);
  }

  @Post('/register')
  register(@Body() payload: RegisterDTO): Promise<LoginResponseDTO> {
    return this.authService.register(payload);
  }
}