import { ProductEntity } from '../entity';
import { ProductMapper } from '../mapper';

describe('ProductMapper', () => {
  describe('#toModel()', () => {
    it('map product entity to product', () => {
      const productEntity = new ProductEntity();
      productEntity.id = 'id';
      productEntity.name = 'Product A';
      productEntity.price = 10;
      productEntity.brand = 'Brand X';
      productEntity.color = 'black';

      const product = ProductMapper.toModel(productEntity);

      expect(product).toEqual(expect.objectContaining({
        id: 'id',
        name: 'Product A',
        price: 10,
        brand: 'Brand X',
        color: 'black',
      }));
    });
  });
});
