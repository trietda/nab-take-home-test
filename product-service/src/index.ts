import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config();

import config from 'config';
import * as Common from './common';
import * as Infra from './infra';
import * as Web from './web';

(async () => {
  global.logger = Common.LoggerFactory.createLogger();

  const connectionManager = new Infra.ConnectionManager();
  await connectionManager.connect();

  const integrationEventManager = new Infra.IntegrationEventManager();
  await integrationEventManager.init();

  const appBuilder = new Web.AppBuilder();
  appBuilder.setGlobalMiddlewares();
  appBuilder.configRouters();
  const app = appBuilder.getApp();

  Web.DomainEventRegister.registerDomainEvents();
  await Web.IntegrationEventRegister.registerIntegrationEvent();

  const server = new Web.CustomServer(app);
  const port = config.get<number>('server.port');
  server.listen(port);
})();
