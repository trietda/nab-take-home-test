import { getConnection } from 'typeorm';
import { Express } from 'express';
import * as Common from '../src/common';
import * as Infra from '../src/infra';
import * as Web from '../src/web';

jest.mock('../src/infra/RabbitMQ');

declare global {
  namespace NodeJS {
    interface Global {
      integrationEventManager: Infra.IntegrationEventManager,
      connectionManager: Infra.ConnectionManager,
      app: Express
    }
  }
}

beforeAll(async () => {
  const logger = Common.LoggerFactory.createLogger();
  global.logger = logger;

  const connectionManager = new Infra.ConnectionManager();
  await connectionManager.connect();

  const integrationEventManager = new Infra.IntegrationEventManager();
  await integrationEventManager.init();

  const appBuilder = new Web.AppBuilder();
  appBuilder.setGlobalMiddlewares();
  appBuilder.configRouters();
  const app = appBuilder.getApp();

  Web.DomainEventRegister.registerDomainEvents();

  global.integrationEventManager = integrationEventManager;
  global.connectionManager = connectionManager;
  global.app = app;
});

afterEach(async () => {
  await getConnection().transaction(async (manager) => {
    await manager.query('SET FOREIGN_KEY_CHECKS = 0;');
    const entities = Object.values(Infra.Entities);
    await Promise.all(entities.map((entity) => manager.clear(entity)));
    await manager.query('SET FOREIGN_KEY_CHECKS = 1;');
  });
});

afterAll(async () => {
  await global.connectionManager.close();
});
