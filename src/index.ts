import { config } from '../config';
import { prepareApp } from './app';
import Logger from './core/services/logger';

prepareApp().then((app) => {
  process.on('uncaughtException', (error: any) => {
    Logger.error(error.message);
  });
  app.listen(config.get('port'), '0.0.0.0', (err: Error) => {
    if (err) throw err;
    Logger.info(`SuperAdmin: Backend listening on port ${config.get('port')}!`);
  });
}).catch(exception => {
  throw exception;
});
