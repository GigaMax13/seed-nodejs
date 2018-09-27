import knex from 'knex';
import bookshelf from 'bookshelf';

const {
  DB_CLIENT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_SSL,
} = process.env;

const db = bookshelf(knex({
  client: DB_CLIENT,
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    charset: 'utf8',
    ssl: DB_SSL.toLowerCase() === 'true',
  },
}));

db.plugin('pagination');
db.plugin('registry');

export default db;
