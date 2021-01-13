import { Module, HttpModule } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '../../common/config/config.module';
import { AuthService } from './auth.service';
@Module({
  imports: [ConfigModule, HttpModule, DatabaseModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class ServiceModule {}