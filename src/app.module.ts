import { Module } from '@nestjs/common';
import { ConfigModule } from './common/config/config.module';
import { DomainModule } from './domain/domain.module';
import { ApiModule } from './api/api.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ServiceModule } from './infrastructure/services/service.module';
import { AuthService } from './infrastructure/services/auth.service';
import { UserService } from './infrastructure/services/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from './common/config/config.service';

@Module({
  imports: [
    ApiModule,
    ConfigModule,
    DomainModule,
    DatabaseModule,
    ServiceModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.secret,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
