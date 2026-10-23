import mysql, { type Pool } from 'mysql2/promise';

let pool: Pool | undefined;

export function getContactDatabase(): Pool {
  if (!pool) {
    const password = process.env.MYSQL_PASSWORD;
    if (!password) {
      throw new Error('MYSQL_PASSWORD is not configured.');
    }

    pool = mysql.createPool({
      host: process.env.MYSQL_HOST || '127.0.0.1',
      port: Number(process.env.MYSQL_PORT || 3306),
      user: process.env.MYSQL_USER || 'autoscanora_app',
      password,
      database: process.env.MYSQL_DATABASE || 'checkmyvehicles',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: 'utf8mb4',
    });
  }

  return pool;
}
