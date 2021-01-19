import { Module, HttpModule } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '../../common/config/config.module';
import { ConfigService } from '../../common/config/config.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/models/user.entity';
@Module({
  imports: [
    ConfigModule,
    HttpModule,
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.secret,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [AuthService, UserService],
  exports: [AuthService],
})
export class ServiceModule {}
