import {
  Body,
  Request,
  Controller,
  Inject,
  Logger,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { LoginResponseDTO } from '../../domain/dto/loginResponse.dto';
import { LoginDTO } from '../../domain/dto/login.dto';
import { RegisterDTO } from '../../domain/dto/register.dto';
import { AuthService } from '../../infrastructure/services/auth.service';
import { JwtAuthGuard } from 'src/infrastructure/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  private readonly logger = new Logger(AuthController.name);

  @Post('/login')
  login(@Body() payload: LoginDTO): Promise<LoginResponseDTO> {
    this.logger.log('Login ' + payload.email);
    return this.authService.login(payload);
  }

  @Post('/register')
  register(@Body() payload: RegisterDTO): Promise<LoginResponseDTO> {
    this.logger.log('Login ' + payload.email);
    return this.authService.register(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    this.logger.log('Me ' + req);
    return req.user;
  }
}
