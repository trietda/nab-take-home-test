import { Request, Response } from 'express';
import {
  Page, Product, ProductSearchCriteria, User,
} from '../../../../core';
import { ProductRepository, UnitOfWork, UserRepository } from '../../../../infra';
import { NotFoundError } from '../../../../common';

export async function searchProducts(req: Request, res: Response) {
  let productPage: Page<Product> = {
    data: [],
    count: 0,
  };
  const user = new User(req.locals.user);
  const productSearchCriteria = new ProductSearchCriteria(req.query.search as string);
  user.search(productSearchCriteria);

  const unitOfWork = new UnitOfWork();
  await unitOfWork.init();
  const productRepository = unitOfWork.getRepository(ProductRepository);
  const userRepository = unitOfWork.getRepository(UserRepository);

  await unitOfWork.commit(async () => {
    productPage = await productRepository.search(productSearchCriteria);
    await userRepository.save(user);
  });

  res.json(productPage);
}

export async function getProduct(req: Request, res: Response) {
  let product: Product | undefined;

  const unitOfWork = new UnitOfWork();
  await unitOfWork.init();
  const productRepository = unitOfWork.getRepository(ProductRepository);
  const userRepository = unitOfWork.getRepository(UserRepository);

  await unitOfWork.commit(async () => {
    const user = new User(req.locals.user);
    product = await productRepository.findById(req.params.productId);

    if (!product) {
      throw new NotFoundError('product not found');
    }

    user.view(product);
    await userRepository.save(user);
  });

  res.json(product);
}
