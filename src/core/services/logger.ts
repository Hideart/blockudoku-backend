import { createLogger, format, transports } from 'winston';
import { config } from '../../../config';
import { NodeEnv } from '../models/enums/env';

export default createLogger({
  format: format.printf(
    info => `[${new Date().toISOString()}][${info.level}] ${info.message}`,
  ),
  level: config.get('env') === NodeEnv.DEV ? 'debug' : 'info',
  transports: [
    new transports.Console(),
  ],
});
