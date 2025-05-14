import config from '../config';
import { Pool } from 'pg';

const pool: Pool = new Pool({
    user: config.PSQL_USER as string,
    host: config.PSQL_HOST as string,
    database: config.PSQL_DB as string,
    password: config.PSQL_PASSWORD as string,
    port: config.PSQL_PORT as number,
});

export default pool;