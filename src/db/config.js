module.exports = {
  development: {
    username: 'db-admin',
    password: 'Bl0ckuD0kuAdm1n',
    database: 'blockudoku',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: '6543',
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
