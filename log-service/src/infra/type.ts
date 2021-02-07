import { ConsumeMessage } from 'amqplib';

export type RabbitMqRoute = {
  exchange: string;
  route: string;
};

export interface IIntegrationEventHandler {
  handle(payload: ConsumeMessage): Promise<void>;
}
