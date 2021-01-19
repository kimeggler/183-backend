import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { LoginResponseDTO } from '../../domain/dto/loginResponse.dto';
import { LoginDTO } from '../../domain/dto/login.dto';
import { RegisterDTO } from '../../domain/dto/register.dto';
import { AuthService } from '../../infrastructure/services/auth.service';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  private readonly logger = new Logger(AuthController.name);

  @Post('/login')
  login(@Body() payload: LoginDTO): Promise<LoginResponseDTO> {
    this.logger.log(payload);
    return this.authService.login(payload);
  }

  @Post('/register')
  register(@Body() payload: RegisterDTO): Promise<LoginResponseDTO> {
    this.logger.log(payload);
    return this.authService.register(payload);
  }
}
