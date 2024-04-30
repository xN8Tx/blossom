import dotenv from 'dotenv';
import pg from 'pg';

import type { PoolConfig } from 'pg';

dotenv.config();

const {Pool} = pg
let databasePoolConfig: PoolConfig;

if (process.env.NODE_ENV === 'production') {
  databasePoolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: false,
  };
} else {
  databasePoolConfig = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
  };
}

const databasePool = new Pool(databasePoolConfig);

export default databasePool;
