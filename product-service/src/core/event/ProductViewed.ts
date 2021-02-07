import { IDomainEvent } from '../type';
import { Product, User } from '../model';

export default class ProductViewed implements IDomainEvent {
  payload: {
    user: User,
    product: Product,
  };

  constructor(user: User, product: Product) {
    this.payload = { user, product };
  }
}
