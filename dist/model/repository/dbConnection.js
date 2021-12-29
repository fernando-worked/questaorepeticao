"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.poolDB = void 0;
const pg_1 = require("pg");
exports.poolDB = new pg_1.Pool({
    host: 'localhost',
    database: 'testes',
    port: 5432,
    user: 'postgres',
    password: 'F@tec123',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
module.exports = { poolDB: exports.poolDB };
