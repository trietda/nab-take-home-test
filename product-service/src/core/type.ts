import { EntityManager } from 'typeorm';

export interface IDomainEvent {
  payload: Object
}

export interface IEventHandler<T extends IDomainEvent> {
  handle(event: T, entityManager: EntityManager): void
}

export type Page<T> = {
  data: T[];
  count: number;
};
