import { ProductEntity } from '../entity';
import { Product } from '../../core';

export default class ProductMapper {
  static toModel(entity: ProductEntity): Product {
    const product = new Product(entity.name, entity.price);
    product.brand = entity.brand;
    product.color = entity.color;
    product.setId(entity.id);
    return product;
  }
}
