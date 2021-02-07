import { Logger } from 'winston';

export * from './error';
export { SINGLETON_KEY, SingletonClass, default as Singleton } from './Singleton';
export { default as LoggerFactory } from './LoggerFactory';

declare global {
  namespace NodeJS {
    interface Global {
      logger: Logger
    }
  }
}
