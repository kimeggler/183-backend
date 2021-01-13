import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../../common/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.databaseType,
          host: configService.databaseHost,
          port: configService.databasePort,
          username: configService.databaseUser,
          logging: configService.databaseLogging,
          password: configService.databasePassword,
          database: configService.databaseName,
          entities: [__dirname + '/../../domain/models/*.entity.{ts,js}'],
          synchronize: configService.databaseSynchronize,
        } as Partial<TypeOrmModuleOptions>;
      },
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}