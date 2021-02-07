import { SINGLETON_KEY, SingletonClass } from '../../common';
import RabbitMQ from '../RabbitMQ';
import { IntegrationEventManager } from '../index';

jest.mock('../RabbitMQ');

const RabbitMQMock = RabbitMQ as jest.MockedClass<typeof RabbitMQ>;

describe('IntegrationEventManager', () => {
  beforeEach(() => {
    // eslint-disable-next-line max-len
    delete (IntegrationEventManager as SingletonClass<typeof IntegrationEventManager>)[SINGLETON_KEY];
    jest.clearAllMocks();
  });

  describe('#init()', () => {
    it('initialize RabbitMQ', async () => {
      const integrationEventManager = new IntegrationEventManager();
      await integrationEventManager.init();

      expect(RabbitMQMock).toHaveBeenCalledTimes(1);
      const mockedRabbitMQInstance = RabbitMQMock.mock.instances[0];
      expect(mockedRabbitMQInstance.connect).toHaveBeenCalledTimes(1);
    });

    it('not initialize twice', async () => {
      const integrationEventManager = new IntegrationEventManager();
      await integrationEventManager.init();
      await integrationEventManager.init();

      expect(RabbitMQMock).toHaveBeenCalledTimes(1);
      const mockedRabbitMQInstance = RabbitMQMock.mock.instances[0];
      expect(mockedRabbitMQInstance.connect).toHaveBeenCalledTimes(1);
    });
  });

  describe('#subscribe()', () => {
    it('subscribe to RabbitMQ', async () => {
      const handler = {
        handle: jest.fn(),
      };

      const integrationEventManager = new IntegrationEventManager();
      await integrationEventManager.init();
      await integrationEventManager.subscribe('user-event.user.create', handler);

      const mockedRabbitMQInstance = RabbitMQMock.mock.instances[0];
      expect(mockedRabbitMQInstance.consume).toHaveBeenCalledTimes(1);
      expect(mockedRabbitMQInstance.consume).toHaveBeenCalledWith(
        {
          exchange: 'user',
          route: 'event.user.create',
        },
        handler.handle,
      );
    });
  });

  describe('#publish()', () => {
    it('publish to RabbitMQ', async () => {
      const integrationEventManager = new IntegrationEventManager();
      await integrationEventManager.init();
      const payload = {};
      await integrationEventManager.publish('user-event.user.create', payload);

      const mockedRabbitMQInstance = RabbitMQMock.mock.instances[0];
      expect(mockedRabbitMQInstance.publish).toHaveBeenCalledTimes(1);
      expect(mockedRabbitMQInstance.publish).toHaveBeenCalledWith(
        {
          exchange: 'user',
          route: 'event.user.create',
        },
        payload,
      );
    });
  });
});
