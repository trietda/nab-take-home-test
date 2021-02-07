import { Logger } from 'winston';

export { SINGLETON_KEY, SingletonClass, default as Singleton } from './Singleton';
export * from './error';
export { default as LoggerFactory } from './LoggerFactory';

declare global {
  namespace NodeJS {
    interface Global {
      logger: Logger
    }
  }
}
