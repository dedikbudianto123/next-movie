import {
  createLogger,
  format,
  LeveledLogMethod,
  Logger,
  transports
} from 'winston';

import { ErrorApps } from './error-apps.helper';

/**
 * Logger
 * @author Dedik Budianto <dedik.budianto@99.co>
 * @since 2021.02.07
 */
export class SingletonLogger {
  private static instance: SingletonLogger;

  public logger: Logger;

  constructor() {
    this.logger = createLogger({
      defaultMeta: { service: `user-service` },
      format: format.json(),
      level: `info`,
      transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new transports.File({ filename: `error.log`, level: `error` }),
        new transports.File({ filename: `combined.log` })
      ]
    });
  }

  /**
   * Parsing error
   * @param {LeveledLogMethod} fn
   * @param {string | Error | ErrorApps} message
   * @returns {void}
   */
  private parsingError(
    fn: LeveledLogMethod,
    message: string | Error | ErrorApps
  ): void {
    if (message instanceof Error) {
      fn(message.message);
    } else if (((message as unknown) as ErrorApps) instanceof ErrorApps) {
      fn(((message as unknown) as ErrorApps).message);
    } else {
      fn(message);
    }
  }

  /**
   * Error info
   * @param {string | Error | ErrorApps} message - error message
   * @returns {void}
   */
  public info(message: string | Error | ErrorApps): void {
    this.parsingError(this.logger.info, message);
  }

  /**
   * Error message
   * @param {string | Error | ErrorApps} message - error message
   * @returns {void}
   */
  public error(message: string | Error | ErrorApps): void {
    this.parsingError(this.logger.error, message);
  }

  /**
   * Get instance
   * @returns {SingletonLogger}
   */
  public static getInstance(): SingletonLogger {
    if (SingletonLogger.instance === undefined) {
      SingletonLogger.instance = new SingletonLogger();
    }

    return SingletonLogger.instance;
  }
}
