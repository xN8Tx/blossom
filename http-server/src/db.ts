import { Pool } from 'pg';

const databasePoolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: false,
};

const databasePool = new Pool(databasePoolConfig);

export default databasePool;
