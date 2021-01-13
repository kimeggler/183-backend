import { Module } from '@nestjs/common';
import { ConfigModule } from './common/config/config.module';
import { DomainModule } from './domain/domain.module';
import { ApiModule } from './api/api.module';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [ApiModule, ConfigModule, DomainModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}