import { Singleton } from '../common';
import RabbitMQ from './RabbitMQ';
import RabbitMQRouteMapper from './mapper/RabbitMQRouteMapper';
import { IIntegrationEventHandler } from './type';

@Singleton
export default class IntegrationEventManager {
  private _rabbitMq: RabbitMQ;

  private _init: boolean;

  constructor() {
    this._rabbitMq = new RabbitMQ();
    this._init = false;
  }

  async init() {
    if (this._init) {
      return;
    }

    await this._rabbitMq.connect();
    this._init = true;
  }

  async publish(eventName: string, payload: any): Promise<void> {
    const rabbitMQRoute = RabbitMQRouteMapper.toRabbitMqRoute(eventName);
    await this._rabbitMq.publish(rabbitMQRoute, payload);
  }

  async subscribe(eventName: string, handler: IIntegrationEventHandler) {
    const rabbitMQRoute = RabbitMQRouteMapper.toRabbitMqRoute(eventName);
    await this._rabbitMq.consume(rabbitMQRoute, handler.handle);
  }
}
