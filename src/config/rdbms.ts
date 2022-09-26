import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SnakeNamingStrategy } from '../utils/snake.naming.strategy';
import './env.setup';

const SCHEMA = 'local_db_schema';
const config: Record<string, PostgresConnectionOptions> = {
  test: {
    entities: ['dist/api/src/modules/**/*.entity{.ts,.js}'],
    extra: {
      max: 5,
      min: 2,
      keepConnectionAlive: true,
      cli: {
        migrationsDir: 'src/migrations',
      },
    }, // connection pool
    replication: {
      master: {
        host: 'localhost',
        password: 'postgres',
        port: 5432,
        username: 'postgres',
        database: 'test_db',
      },
      slaves: [
        {
          host: 'localhost',
          password: 'postgres',
          port: 5432,
          username: 'postgres',
          database: 'test_db',
        },
      ],
    },
    synchronize: false,
    logging: false,
    type: 'postgres',
    username: 'postgres',
    namingStrategy: new SnakeNamingStrategy(),
    migrations: ['dist/api/src/migrations/*{.ts,.js}'],
    migrationsRun: true,
    schema: SCHEMA,
  },
  development: {
    database: process.env.POSTGRES_DB,
    entities: ['dist/api/src/migrations/*{.ts,.js}'],
    extra: {
      max: 5,
      min: 2,
      keepConnectionAlive: true,
      cli: {
        migrationsDir: 'src/migrations',
      },
    }, // connection pool
    replication: {
      master: {
        host: process.env.POSTGRES_HOST,
        password: process.env.POSTGRES_PASSWORD,
        port: +process.env.PORSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
      },
      slaves: [
        {
          host: process.env.POSTGRES_HOST,
          password: process.env.POSTGRES_PASSWORD,
          port: +process.env.PORSTGRES_PORT,
          username: process.env.POSTGRES_USER,
          database: process.env.POSTGRES_DB,
        },
      ],
    },
    synchronize: false,
    logging: false,
    type: 'postgres',
    username: 'postgres',
    namingStrategy: new SnakeNamingStrategy(),
    migrations: ['dist/api/src/migrations/*{.ts,.js}'],
    migrationsRun: true,
    schema: SCHEMA,
  },
};

const getRdbmsConfig = (env?: string) => {
  if (!env) {
    env = 'development';
  }
  const configuration: PostgresConnectionOptions = config[env];

  return configuration;
};

const rdbmsConfig: PostgresConnectionOptions = getRdbmsConfig(process.env.NODE_ENV);

export default rdbmsConfig;
