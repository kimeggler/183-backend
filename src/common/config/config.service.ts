import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { DatabaseType } from 'typeorm';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    this.setCloudFoundryEnv();
    dotenv.config({ path: filePath });
    this.envConfig = this.validateEnv();
  }

  get nodeEnv(): string {
    return this.envConfig.NODE_ENV;
  }

  get port(): number {
    return +this.envConfig.PORT;
  }

  /**
   * The applications name
   */
  get appName(): string {
    return this.envConfig.APP_NAME;
  }

  /**
   * The database host uri
   */
  get databaseHost(): string {
    return this.envConfig.DATABASE_HOST;
  }

  /**
   * The user used for authentication against
   * the database
   */
  get databaseUser(): string {
    return this.envConfig.DATABASE_USER;
  }

  /**
   * The password for accessing the database
   */
  get databasePassword(): string {
    return this.envConfig.DATABASE_PASSWORD;
  }

  /**
   * The port on which the database is accessed
   */
  get databasePort(): number {
    return +this.envConfig.DATABASE_PORT;
  }

  /**
   * The database name
   */
  get databaseName(): string {
    return this.envConfig.DATABASE_NAME;
  }

  /**
   * The database type (generally mysql)
   */
  get databaseType(): DatabaseType {
    return this.envConfig.DATABASE_TYPE as DatabaseType;
  }

  /**
   * Whether or not to synchronize the database
   */
  get databaseSynchronize(): boolean {
    return Boolean(this.envConfig.DATABASE_SYNCHRONIZE);
  }

  /**
   * The database logging mode
   */
  get databaseLogging(): LoggerOptions {
    return this.envConfig.DATABASE_LOGGING?.split(',') as LoggerOptions;
  }

  private validateEnv(): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      PORT: Joi.number().default(3000),
      APP_NAME: Joi.string().required(),
      DATABASE_HOST: Joi.string().required(),
      DATABASE_USER: Joi.string().required(),
      DATABASE_PASSWORD: Joi.string().required(),
      DATABASE_NAME: Joi.string().required(),
      DATABASE_TYPE: Joi.string().default('mysql'),
      DATABASE_PORT: Joi.number().default(3306),
      DATABASE_LOGGING: Joi.string().default('error'),
      DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      process.env,
      {
        allowUnknown: true,
      },
    );

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }

  /**
   * Sets cloud foundry env variables
   */
  private setCloudFoundryEnv() {
    if (process.env.VCAP_SERVICES !== undefined) {
      const services = JSON.parse(process.env.VCAP_SERVICES);
      process.env.DATABASE_TYPE = 'mysql';
      process.env.DATABASE_NAME =
        services['mysql-database'][0].credentials.database;
      process.env.DATABASE_USER =
        services['mysql-database'][0].credentials.username;
      process.env.DATABASE_PASSWORD =
        services['mysql-database'][0].credentials.password;
      process.env.DATABASE_HOST =
        services['mysql-database'][0].credentials.host;
      process.env.DATABASE_PORT =
        services['mysql-database'][0].credentials.port;
    }
  }
}
