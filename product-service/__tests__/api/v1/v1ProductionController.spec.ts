import request from 'supertest';
import { getConnection } from 'typeorm';
import { ProductEntity } from '../../../src/infra/entity';

describe('Product API (v1)', () => {
  describe('GET /api/v1/products', () => {
    it('list all products', async () => {
      const productEntityRepo = getConnection().getRepository(ProductEntity);
      const products = [
        productEntityRepo.create({
          name: 'Product A',
          price: 5,
        }),
        productEntityRepo.create({
          name: 'Product B',
          price: 10,
          brand: 'Brand X',
        }),
      ];
      await productEntityRepo.save(products);

      const res = await request(global.app)
        .get('/api/v1/products')
        .set('x-user', 'Test User');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.objectContaining({
        data: expect.arrayContaining([
          expect.objectContaining({
            id: products[0].id,
            name: products[0].name,
            price: products[0].price,
            brand: products[0].brand,
            color: products[0].color,
          }),
          expect.objectContaining({
            id: products[1].id,
            name: products[1].name,
            price: products[1].price,
            brand: products[1].brand,
            color: products[1].color,
          }),
        ]),
        count: 2,
      }));
    });

    it('emit user search product event', async () => {
      const publishSpy = jest.spyOn(global.integrationEventManager, 'publish');

      await request(global.app)
        .get('/api/v1/products')
        .query({ search: 'Search Query' })
        .set('x-user', 'Test User');

      expect(publishSpy).toBeCalledTimes(1);
      expect(publishSpy).toBeCalledWith(
        'product-event.userSearchProduct',
        expect.objectContaining({
          user: expect.objectContaining({ name: 'Test User' }),
          productSearchCriteria: expect.objectContaining({ search: 'Search Query' }),
        }),
      );
    });
  });

  describe('/GET api/v1/products/:productId', () => {
    it('return product detail', async () => {
      const productEntityRepo = getConnection().getRepository(ProductEntity);
      const product = productEntityRepo.create({
        name: 'Product A',
        price: 5,
      });
      await productEntityRepo.save(product);

      const res = await request(global.app)
        .get(`/api/v1/products/${product.id}`)
        .set('x-user', 'Test User');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.objectContaining({
        id: product.id,
        name: product.name,
        price: product.price,
        brand: product.brand,
        color: product.color,
      }));
    });

    it('emit user view product event', async () => {
      const publishSpy = jest.spyOn(global.integrationEventManager, 'publish');
      const productEntityRepo = getConnection().getRepository(ProductEntity);
      const product = productEntityRepo.create({
        name: 'Product A',
        price: 5,
      });
      await productEntityRepo.save(product);

      const res = await request(global.app)
        .get(`/api/v1/products/${product.id}`)
        .set('x-user', 'Test User');

      expect(res.status).toBe(200);
      expect(publishSpy).toBeCalledTimes(1);
      expect(publishSpy).toBeCalledWith(
        'product-event.userViewProduct',
        expect.objectContaining({
          user: expect.objectContaining({ name: 'Test User' }),
          product: expect.objectContaining({
            id: product.id,
            name: product.name,
            price: product.price,
            brand: product.brand,
            color: product.color,
          }),
        }),
      );
    });
  });
});
