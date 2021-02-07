import { IEventHandler, ProductViewed } from '../../core';
import { IntegrationEventManager } from '../../infra';

export default class ProductViewedHandler implements IEventHandler<ProductViewed> {
  // eslint-disable-next-line class-methods-use-this
  async handle(event: ProductViewed): Promise<void> {
    const integrationEventManager = new IntegrationEventManager();
    await integrationEventManager.publish('product-event.userViewProduct', event.payload);
  }
}
