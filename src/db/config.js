module.exports = {
  development: {
    username: 'psg-user',
    password: 'example',
    database: 'll_sa',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: '5432',
  },
  test: {
    username: 'psg-user',
    password: 'example',
    database: 'll_sa',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: '5432',
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres'
  }
};
