import { ConsumeMessage } from 'amqplib';
import { getConnection } from 'typeorm';
import { User, UserActivity } from '../../core';
import { IIntegrationEventHandler } from '../../infra';
import { UserViewProductEvent } from '../../infra/payloadMessage';
import { UserActivityRepository } from '../../infra/repository';

export default class UserViewProductHandler implements IIntegrationEventHandler {
  // eslint-disable-next-line class-methods-use-this
  async handle(message: ConsumeMessage): Promise<void> {
    const payload = JSON.parse(message.content.toString()) as UserViewProductEvent;
    const userActivity = new UserActivity(
      new User(payload.user.name),
      'view',
      'Product',
      payload.product.id,
      {
        name: payload.product.name,
        price: payload.product.price,
        brand: payload.product.brand,
        color: payload.product.color,
      },
    );
    const entityManager = getConnection().manager;
    const userActivityRepository = new UserActivityRepository(entityManager);
    await userActivityRepository.save(userActivity);
  }
}
