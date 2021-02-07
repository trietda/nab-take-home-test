import Model from './Model';

export default class Product extends Model {
  name: string;

  price: number;

  brand?: string;

  color?: string;

  constructor(name: string, price: number) {
    super();
    this.name = name;
    this.price = price;
  }
}
