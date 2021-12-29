import { Pool } from 'pg';

export const poolDB = new Pool({
    host: 'localhost',
    database: 'testes',
    port: 5432,
    user: 'postgres',
    password: 'F@tec123',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
}) 
 

module.exports = { poolDB }; 