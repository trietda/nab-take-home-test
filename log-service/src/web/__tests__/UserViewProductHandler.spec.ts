import { ConsumeMessage, ConsumeMessageFields, MessageProperties } from 'amqplib';
import { UserActivityRepository } from '../../infra';
import { UserViewProductHandler } from '../integrationEventHandler';

jest.mock('../../infra/repository/UserActivityRepository');

// eslint-disable-next-line max-len
const UserActivityRepoMock = UserActivityRepository as jest.MockedClass<typeof UserActivityRepository>;

describe('UserViewProductHandler', () => {
  describe('#handle()', () => {
    it('handle user view product event', async () => {
      const consumeMessage: ConsumeMessage = {
        content: Buffer.from(JSON.stringify({
          user: { name: 'User Name' },
          product: {
            id: 'fakeId',
            name: 'Product A',
            price: 10,
            brand: 'Brand X',
            color: 'White',
          },
        })),
        fields: {} as ConsumeMessageFields,
        properties: {} as MessageProperties,
      };

      const handler = new UserViewProductHandler();
      await handler.handle(consumeMessage);

      const userActivityRepo = UserActivityRepoMock.mock.instances[0];
      expect(userActivityRepo.save).toBeCalledTimes(1);
      expect(userActivityRepo.save).toBeCalledWith(expect.objectContaining({
        user: expect.objectContaining({
          name: 'User Name',
        }),
        action: 'view',
        objectType: 'Product',
        objectId: 'fakeId',
        metadata: expect.objectContaining({
          name: 'Product A',
          price: 10,
          brand: 'Brand X',
          color: 'White',
        }),
      }));
    });
  });
});
