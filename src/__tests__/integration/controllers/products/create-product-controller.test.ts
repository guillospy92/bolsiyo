import {givenEmptyDataBase} from '../../../helpers/database.helper';
import {givenBusiness} from '../../../helpers/create-business.helper';
import {givenCategory} from '../../../helpers/create-category.helper';
import {CreateProductController} from '../../../../controllers/products/create-product.controller';
import {ProductDto} from '../../../../dtos/product.dto';
import {getServiceApplication} from '../../../instances/test-instances.memory';
import {expect} from '@loopback/testlab';

const assert = require('chai').assert;

describe('ProductController (integration)', () => {
  const productDto = getDataInitial();
  beforeEach(givenEmptyDataBase);
  it('create product success', async () => {
    const business = await givenBusiness();
    const category = await givenCategory();

    productDto.businessId = business.getId()
    productDto.categoryId = category.getId()

    const response = await getController().create(productDto);

    expect(response.id).not.null();
    expect(response.name).eql(productDto.name);
    expect(response.purchasePrice).eql(productDto.purchasePrice);
    expect(response.salePrice).eql(productDto.salePrice);
    expect(response.businessId).eql(productDto.businessId);
    expect(response.businessId).eql(productDto.businessId);
    expect(response.businessId).eql(productDto.businessId);
  });
  it('create product business not exists', async () => {
    try {
      productDto.businessId = 0;
      await getController().create(productDto);
      assert.fail();
    } catch (e) {
      expect(e.message).eql('error not exist business');
    }
  });
  it('create product category not exists', async () => {
    try {
      const business = await givenBusiness();
      productDto.businessId = business.id ?? 1;

      await getController().create(productDto);
      assert.fail();
    } catch (e) {
      expect(e.message).eql('error not exist category');
    }
  });
});


function getController(): CreateProductController {
  const serviceApplication = getServiceApplication();

  return new CreateProductController(
    serviceApplication.productService,
    serviceApplication.businessService,
    serviceApplication.categoryService,
  );
}

function getDataInitial(): ProductDto {
  const productDto = new ProductDto();
  productDto.name = 'Milk';
  productDto.purchasePrice = 3000;
  productDto.salePrice = 3000;
  productDto.businessId = 1;
  productDto.categoryId = 1;
  productDto.stock = 1;

  return productDto;
}
