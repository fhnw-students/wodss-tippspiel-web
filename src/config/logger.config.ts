import * as Logger from 'js-logger';

import { appConfig } from '@/config/app.config';

// -------------------------------------------------------------------------
// Logger Configurations
// -------------------------------------------------------------------------

const LogLevel = appConfig.logLevel;
Logger.setLevel((Logger as any)[LogLevel]);
Logger.useDefaults();

/**
 * @name createLogger
 * @description Creates a new logger for the given channel.
 * @param channelOrClass Component class or a string with the name of the channel.
 */
export const createLogger = (channelOrClass: string | any) => {
  if (channelOrClass && channelOrClass.name) {
    return Logger.get(channelOrClass.name);
  }
  return Logger.get(channelOrClass);
};
