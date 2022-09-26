import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    MONGO_DB_HOST: str(),
    MONGO_DB_NAME: str(),
    PORT: port(),
  });
};

export default validateEnv;
