import { IEventHandler, ProductSearched } from '../../core';
import { IntegrationEventManager } from '../../infra';

export default class ProductSearchedHandler implements IEventHandler<ProductSearched> {
  // eslint-disable-next-line class-methods-use-this
  async handle(event: ProductSearched): Promise<void> {
    const integrationEventManager = new IntegrationEventManager();
    await integrationEventManager.publish('product-event.userSearchProduct', event.payload);
  }
}
