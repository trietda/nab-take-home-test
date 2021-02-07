import RabbitMQRouteMapper from '../mapper/RabbitMQRouteMapper';

describe('RabbitMQRouteMapper', () => {
  describe('#toRabbitMQRoute()', () => {
    it('map event name to RabbitMQRoute', () => {
      const route = RabbitMQRouteMapper.toRabbitMqRoute('user-event.user.created');

      expect(route.exchange).toBe('user');
      expect(route.route).toBe('event.user.created');
    });
  });
});
