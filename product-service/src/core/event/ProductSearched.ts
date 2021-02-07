import { IDomainEvent } from '../type';
import { ProductSearchCriteria, User } from '../model';

export default class ProductSearched implements IDomainEvent {
  payload: {
    user: User,
    productSearchCriteria: ProductSearchCriteria,
  };

  constructor(user: User, productSearchCriteria: ProductSearchCriteria) {
    this.payload = { user, productSearchCriteria };
  }
}
