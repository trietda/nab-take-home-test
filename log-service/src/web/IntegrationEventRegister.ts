import { IntegrationEventManager } from '../infra';
import { UserSearchProductHandler, UserViewProductHandler } from './integrationEventHandler';

export default class IntegrationEventRegister {
  static async registerIntegrationEvent() {
    const integrationEventManager = new IntegrationEventManager();
    await integrationEventManager.subscribe('product-event.userViewProduct', new UserViewProductHandler());
    await integrationEventManager.subscribe('product-event.userSearchProduct', new UserSearchProductHandler());
  }
}
