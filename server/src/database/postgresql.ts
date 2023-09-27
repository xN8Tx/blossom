import { Pool } from 'pg';

// FOR PRODUCTION MODE
// const databasePoolConfig = {
//   connectionString: process.env.DATABASE_URL,
//   ssl: false,
// };

// FOR DEVELOPMENT MODE
const databasePoolConfig = {
  user: 'postgres',
  password: '',
  host: 'localhost',
  port: 5432,
  database: 'Messenger',
};

const databasePool = new Pool(databasePoolConfig);

export default databasePool;
