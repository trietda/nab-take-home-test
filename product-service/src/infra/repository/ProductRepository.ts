import Typeorm, { EntityManager } from 'typeorm';
import { Page, Product, ProductSearchCriteria } from '../../core';
import Repository from './Repository';
import { ProductEntity } from '../entity';
import { ProductMapper } from '../mapper';

export default class ProductRepository extends Repository {
  private productEntityRepo: Typeorm.Repository<ProductEntity>;

  constructor(entityManager: EntityManager) {
    super(entityManager);
    this.productEntityRepo = this.entityManager.getRepository(ProductEntity);
  }

  async search(criteria: ProductSearchCriteria): Promise<Page<Product>> {
    const queryBuilder = this.productEntityRepo.createQueryBuilder('product');

    if (criteria.search) {
      queryBuilder
        .where('product.name = :search')
        .setParameters({ search: criteria.search });
    }

    const [productEntities, count] = await queryBuilder.getManyAndCount();
    return {
      count,
      data: productEntities.map(ProductMapper.toModel),
    };
  }

  async findById(id: string): Promise<undefined | Product> {
    const entity = await this.productEntityRepo.findOne(id);
    return entity && ProductMapper.toModel(entity);
  }
}
