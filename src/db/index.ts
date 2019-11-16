import { Sequelize } from 'sequelize';
import { config } from '../../config';

// Option 1: Passing parameters separately
export const sequelizeConnection = new Sequelize(
  config.get('postgres.dbName'),
  config.get('postgres.dbUser'),
  config.get('postgres.dbPassword'),
    {
      host: config.get('postgres.host'),
      port: config.get('postgres.dbPort'),
      dialect: 'postgres',
    },
);
export async function dbConnect(): Promise<void> {
   try {
      await sequelizeConnection.authenticate();
      console.log('Connected to db');
   } catch (e) {
      console.log('Connected to db failed');
      console.log(e);
      process.exit(1);
   }

}
