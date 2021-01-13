import { Controller, Inject } from '@nestjs/common';
import { AuthService } from 'src/infrastructure/services/auth.service';

@Controller('')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;
}