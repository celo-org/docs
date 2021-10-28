import { inDevelopment } from '../utils';
import { assignSharedLogger, createLogger, Logger } from '@agile-ts/logger';

assignSharedLogger(
  createLogger({
    active: inDevelopment(),
    level: Logger.level.WARN,
  })
);
