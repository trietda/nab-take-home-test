import { DomainEventManager } from '../infra';
import { ProductSearched, ProductViewed } from '../core';
import { ProductSearchedHandler, ProductViewedHandler } from './eventHandler';

export default class DomainEventsRegister {
  static registerDomainEvents() {
    const domainEvents = new DomainEventManager();
    domainEvents.register(ProductSearched, new ProductSearchedHandler());
    domainEvents.register(ProductViewed, new ProductViewedHandler());
  }
}
