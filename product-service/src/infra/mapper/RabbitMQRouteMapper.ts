import { RabbitMqRoute } from '../type';

export default class RabbitMQRouteMapper {
  static toRabbitMqRoute(eventName: string): RabbitMqRoute {
    const regexResult = /^(\w*)-(.*)/.exec(eventName);

    if (!regexResult) {
      throw new Error('invalid eventName');
    }

    return {
      exchange: regexResult[1],
      route: regexResult[2],
    };
  }
}
