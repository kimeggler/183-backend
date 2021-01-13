import { Module } from '@nestjs/common';
import { ServiceModule } from '../infrastructure/services/service.module';

@Module({
  imports: [ServiceModule],
  controllers: [],
  exports: [],
})
export class ApiModule {}