import { ConsumeMessage, ConsumeMessageFields, MessageProperties } from 'amqplib';
import { UserActivityRepository } from '../../infra';
import { UserSearchProductHandler, UserViewProductHandler } from '../integrationEventHandler';

jest.mock('../../infra/repository/UserActivityRepository');

// eslint-disable-next-line max-len
const UserActivityRepoMock = UserActivityRepository as jest.MockedClass<typeof UserActivityRepository>;

describe('UserSeachProductHandler', () => {
  describe('#handle()', () => {
    it('handle user search product event', async () => {
      const consumeMessage: ConsumeMessage = {
        content: Buffer.from(JSON.stringify({
          user: { name: 'User Name' },
          productSearchCriteria: {
            search: 'search term',
          },
        })),
        fields: {} as ConsumeMessageFields,
        properties: {} as MessageProperties,
      };

      const handler = new UserSearchProductHandler();
      await handler.handle(consumeMessage);

      const userActivityRepo = UserActivityRepoMock.mock.instances[0];
      expect(userActivityRepo.save).toBeCalledTimes(1);
      expect(userActivityRepo.save).toBeCalledWith(expect.objectContaining({
        user: expect.objectContaining({
          name: 'User Name',
        }),
        action: 'view',
        objectType: 'ProductSearchCriteria',
        objectId: null,
        metadata: expect.objectContaining({
          search: 'search term',
        }),
      }));
    });
  });
});
