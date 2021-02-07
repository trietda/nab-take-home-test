import Product from './Product';
import ProductSearchCriteria from './ProductSearchCriteria';
import DomainEvents from './DomainEvents';
import { ProductSearched, ProductViewed } from '../event';

export default class User {
  name: string;

  domainEvents: DomainEvents = new DomainEvents();

  constructor(name: string) {
    this.name = name;
  }

  view(product: Product) {
    this.domainEvents.raiseEvent(new ProductViewed(this, product));
  }

  search(productSearchCriteria: ProductSearchCriteria) {
    this.domainEvents.raiseEvent(new ProductSearched(this, productSearchCriteria));
  }

  toJSON() {
    return { name: this.name };
  }
}
