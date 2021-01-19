import { Module } from '@nestjs/common';
import { ServiceModule } from '../infrastructure/services/service.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [ServiceModule],
  controllers: [AuthController],
  exports: [],
})
export class ApiModule {}
