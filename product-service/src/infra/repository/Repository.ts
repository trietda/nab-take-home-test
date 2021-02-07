import { EntityManager } from 'typeorm';
import DomainEventManager from '../DomainEventManager';
import { DomainEvents } from '../../core';

export default class Repository {
  protected readonly entityManager: EntityManager;

  protected readonly domainEventManager: DomainEventManager;

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
    this.domainEventManager = new DomainEventManager();
  }

  async dispatchDomainEvents(domainEvents: DomainEvents): Promise<void> {
    const dispatchPromises = domainEvents.value.map(
      (domainEvent) => this.domainEventManager.dispatch(domainEvent, this.entityManager),
    );
    await Promise.all(dispatchPromises);
  }
}
