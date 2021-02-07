import { IIntegrationEventHandler, UserActivityRepository } from '../../infra';
import { ConsumeMessage } from 'amqplib';
import { UserSearchProductEvent } from '../../infra/payloadMessage';
import { User, UserActivity } from '../../core';
import { getConnection } from 'typeorm';

export default class UserSearchProductHandler implements IIntegrationEventHandler {
  async handle(message: ConsumeMessage): Promise<void> {
    const payload = JSON.parse(message.content.toString()) as UserSearchProductEvent;
    const userActivity = new UserActivity(
      { name: payload.user.name },
      'view',
      'ProductSearchCriteria',
      null,
      { search: payload.productSearchCriteria.search },
    );
    const entityManager = getConnection().manager;
    const userActivityRepository = new UserActivityRepository(entityManager);
    await userActivityRepository.save(userActivity);
  }
}
