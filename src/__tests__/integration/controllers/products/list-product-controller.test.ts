import {givenEmptyDataBase} from '../../../helpers/database.helper';
import {getServiceApplication} from '../../../instances/test-instances.memory';
import {givenProduct} from '../../../helpers/create-product.helper';
import {ListProductController} from '../../../../controllers/products/list-product.controller';
import {givenBusiness} from '../../../helpers/create-business.helper';
import {givenCategory} from '../../../helpers/create-category.helper';
import {expect} from '@loopback/testlab';

describe('ListProductController (integration)', () => {
  beforeEach(givenEmptyDataBase);
  it('list product success', async () => {
    const business = await givenBusiness();
    const category = await givenCategory();

    const businessId = business.getId();
    const categoryId = category.getId();

    const date = new Date('2023-02-02 00:00:00');

    const product = await givenProduct({
      'businessId': businessId,
      'categoryId': categoryId,
      'createdAt': date,
    });
    const serviceApplication = getServiceApplication();
    const controller = new ListProductController(
      serviceApplication.productService,
    );
    const response = await controller.list(businessId);

    const wantExpect = [
      {
        id:  product.id,
        name: product.name,
        purchasePrice: product.purchasePrice,
        salePrice: product.salePrice,
        stock: product.stock,
        businessId: businessId,
        categoryId: categoryId,
        createdAt: date
      }
    ];

    expect(response).to.eql(wantExpect);
  });
});
