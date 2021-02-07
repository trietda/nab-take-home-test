import amqp, { Connection, Channel, ConsumeMessage } from 'amqplib';
import config from 'config';
import stringify from 'fast-safe-stringify';
import { RabbitMqRoute } from './type';

export default class RabbitMQ {
  private connection?: Connection;

  private channel?: Channel;

  private readonly exchangeMap: Record<string, boolean>;

  constructor() {
    this.exchangeMap = {};
  }

  async connect() {
    const connection = await amqp.connect(config.get<string>('rabbitMq.url'));
    const channel = await connection.createChannel();

    this.connection = connection;
    this.channel = channel;
  }

  async publish(route: RabbitMqRoute, message: any): Promise<void> {
    if (!this.channel) {
      throw new Error('rabbitmq not connected');
    }

    await this.assertExchange(route.exchange);
    await this.channel.publish(route.exchange, route.route, Buffer.from(stringify(message)));
  }

  async consume(route: RabbitMqRoute, handler: (message: ConsumeMessage) => void): Promise<void> {
    if (!this.channel) {
      throw new Error('rabbitmq not connected');
    }

    await this.assertExchange(route.exchange);
    const { queue } = await this.channel.assertQueue('', { exclusive: true });
    await this.channel.bindQueue(queue, route.exchange, route.route);
    await this.channel.consume(
      queue,
      (message) => {
        if (!message) {
          // Message canceled by RabbitMQ
          return;
        }

        handler(message);
      },
      { noAck: true },
    );
  }

  private async assertExchange(exchange: string): Promise<void> {
    if (!this.channel) {
      throw new Error('rabbitmq not connected');
    }

    if (!this.isExchangeExists(exchange)) {
      await this.channel.assertExchange(exchange, 'topic');
      this.markExchangeExists(exchange);
    }
  }

  private isExchangeExists(exchange: string): boolean {
    return this.exchangeMap[exchange];
  }

  private markExchangeExists(exchange: string): void {
    this.exchangeMap[exchange] = true;
  }
}
