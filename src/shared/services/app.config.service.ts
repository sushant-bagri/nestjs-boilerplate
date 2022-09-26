import { MongooseModuleOptions } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { logger } from '../../config/logger';
import validateEnv from '../../utils/validate.env';

export class AppConfigService {
  constructor(){
    dotenv.config({
      path: '.env'
    });

    validateEnv();

    for (const envName of Object.keys(process.env)){
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
    }
  };

  public get(key: string): string{
    return process.env[key];
  };

  public getNumber(key: string): number {
    return Number(process.env[key]);
  };

  get nodeEnv(): string{
    return this.get('NODE_ENV') || 'development';
  };

  get isDevEnv(): boolean {
    return this.nodeEnv === 'development';
  };

  get isTestEnv(): boolean {
    return this.nodeEnv === 'test';
  }

  get getMongoConfig(): MongooseModuleOptions {
    // @TODO What about server test case runner?
    // Return different url if it's test or development environment

    let uri: string;
    let awsConfig: MongooseModuleOptions = {};

    let isDbNamePresent = false;
    let dbName = '';

    // hack to run on local
    if (this.isTestEnv) {
      isDbNamePresent = true;
      dbName = 'tag_test';
    } else {
      dbName = this.get('MONGO_DB_NAME');
      if (dbName.trim() !== '') {
        isDbNamePresent = true;
      }
    }
    let authStr = '';
    let authDbStr = '';
    if (this.get('MONGO_DB_USER_NAME')) {
      const MONGO_USERNAME = this.get('MONGO_DB_USER_NAME');
      const MONGO_PASSWORD = this.get('MONGO_DB_PASSWORD');
      authStr = `${MONGO_USERNAME}:${MONGO_PASSWORD}@`;
      authDbStr = '?authSource=admin';
    }

    const dbStr = isDbNamePresent ? `/${dbName}` : '';

    if (this.isTestEnv || this.isDevEnv) {
      uri = `mongodb://${authStr}${this.get('MONGO_DB_HOST')}${dbStr}${authDbStr}`;
    } else {
      uri = `mongodb+srv://${authStr}${this.get('MONGO_DB_HOST')}/${dbName}${authDbStr}`;

      if (this.get('AWS_ACTIVE') && (this.get('AWS_ACTIVE') === 'true' || this.get('AWS_ACTIVE') === '1')) {
        awsConfig = {
          authSource: '$external',
          authMechanism: 'MONGODB-AWS',
        };
      }
    }

    const finalConfig: MongooseModuleOptions = {
      uri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      retryWrites: false,
      // w: "majority",
      ...awsConfig,
    };

    logger.info(`MongoDB Config for ${this.nodeEnv} environment`);
    logger.info(JSON.stringify(finalConfig));

    return finalConfig;
  }
}