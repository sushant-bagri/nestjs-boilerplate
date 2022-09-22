import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { logger } from '../../config/logger';
import rdbmsConfig from '../../config/rdbms';
import circularStructure from '../../utils/circular.structure';
import { SnakeNamingStrategy } from '../../utils/snake.naming.strategy';

export class AppConfigService {
  constructor(){
    dotenv.config({
      path: '.env'
    });

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

  get typeOrmConfig(): TypeOrmModuleOptions {
    let entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}'];
    // let entities = [TransactionEntity, PayoutEntity]
    let migrations = [__dirname + '/../../migrations/*{.ts,.js}'];

    if ((module as any).hot) {
      const entityContext = (require as any).context('./../../modules', true, /\.entity\.ts$/);
      entities = entityContext.keys().map((id: any) => {
        const entityModule = entityContext(id);
        const [entity] = Object.values(entityModule);

        return entity;
      });
      const migrationContext = (require as any).context('./../../migrations', false, /\.ts$/);
      migrations = migrationContext.keys().map((id: any) => {
        const migrationModule = migrationContext(id);
        const [migration] = Object.values(migrationModule);

        return migration;
      });
    }

    logger.info(
      `TypeOrm config: ${JSON.stringify({
        ...rdbmsConfig,
        entities,
        migrations,
        namingStrategy: new SnakeNamingStrategy(),
      }, circularStructure())}`,
    );

    return {
      ...rdbmsConfig,
      entities,
      migrations,
      namingStrategy: new SnakeNamingStrategy(),
      autoLoadEntities: true,
      relationLoadStrategy: 'query',
    };
  }  
}