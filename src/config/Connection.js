import { config } from 'dotenv';
import knex from 'knex';
import bookshelf from 'bookshelf';

config();

const {
  DB_CLIENT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_SSL,
} = process.env;

const Connection = bookshelf(knex({
  client: DB_CLIENT,
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    charset: 'utf8',
    ssl: DB_SSL && DB_SSL.toLowerCase() === 'true',
  },
}));

Connection.plugin('pagination');
Connection.plugin('registry');

export { Connection };
