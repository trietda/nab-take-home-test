import { Product, ProductSearchCriteria, User } from '../model';
import { ProductViewed, ProductSearched } from '../event';

jest.mock('../event/ProductViewed');
jest.mock('../event/ProductSearched');

const ProductViewedMock = ProductViewed as jest.MockedClass<typeof ProductViewed>;
const ProductSearchedMock = ProductSearched as jest.MockedClass<typeof ProductSearched>;

describe('User', () => {
  describe('#view()', () => {
    it('raise product viewed event', () => {
      const user = new User('Test User');
      const product = new Product('Test Product', 10);
      const raiseEventSpy = jest.spyOn(user.domainEvents, 'raiseEvent');

      user.view(product);

      expect(raiseEventSpy).toBeCalledTimes(1);
      expect(ProductViewedMock).toBeCalledWith(user, product);
      expect(raiseEventSpy).toBeCalledWith(ProductViewedMock.mock.instances[0]);
    });
  });

  describe('#search()', () => {
    it('raise product searched event', () => {
      const user = new User('Test User');
      const productSearchCriteria = new ProductSearchCriteria('search term');
      const raiseEventSpy = jest.spyOn(user.domainEvents, 'raiseEvent');

      user.search(productSearchCriteria);

      expect(raiseEventSpy).toBeCalledTimes(1);
      expect(ProductSearchedMock).toBeCalledWith(user, productSearchCriteria);
      expect(raiseEventSpy).toBeCalledWith(ProductSearchedMock.mock.instances[0]);
    });
  });
});
