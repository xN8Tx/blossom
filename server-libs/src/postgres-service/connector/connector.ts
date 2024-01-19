import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

let databasePoolConfig;

if (process.env.NODE_ENV === 'production') {
  databasePoolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: false,
  };
} else {
  databasePoolConfig = {
    user: 'postgres',
    password: '',
    host: 'localhost',
    port: 5432,
    database: 'Messenger',
  };
}

const databasePool = new Pool(databasePoolConfig);

export default databasePool;
