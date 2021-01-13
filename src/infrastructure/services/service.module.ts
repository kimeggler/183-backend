import { Module, HttpModule } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '../../common/config/config.module';

@Module({
  imports: [ConfigModule, HttpModule, DatabaseModule],
  providers: [],
  exports: [],
})
export class ServiceModule {}