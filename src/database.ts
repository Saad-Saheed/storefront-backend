import * as dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
let Client = new Pool();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;

if (ENV == 'test') {
  Client = new Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    database: POSTGRES_TEST_DB,
    password: POSTGRES_PASSWORD,
  });
} else if (ENV == 'dev') {
  Client = new Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
  });
}

export default Client;
