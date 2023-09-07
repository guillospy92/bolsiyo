import {givenEmptyDataBase} from '../../../helpers/database.helper';
import {expect} from '@loopback/testlab';
import {getRepositoryApplication, getServiceApplication} from '../../../instances/test-instances.memory';
import {givenProduct} from '../../../helpers/create-product.helper';
import {UpdateProductController} from '../../../../controllers/products/update-product.controller';
import {ProductDto} from '../../../../dtos/product.dto';

const assert = require('chai').assert;

describe('UpdatedProductController (integration)', () => {
  const productDto = getDataInitial();
  beforeEach(givenEmptyDataBase);
  it('update product success', async () => {
    const product = await givenProduct();
    await getController().updateById(product.getId(), productDto)

    const productUpdated = await getRepositoryApplication().productRepository.findOne(product.getId());

    expect(productUpdated?.name).eql(productDto.name)
  });

  it('update product id not exists', async () => {
    try {
      await getController().updateById(0, productDto)
      assert.fail();
    } catch (e) {
      expect(e.message).eql('Entity not found: products with id 0');
    }
  });
});

function getController(): UpdateProductController {
  const serviceApplication = getServiceApplication();
  return new UpdateProductController(
    serviceApplication.productService,
  );
}

function getDataInitial(): ProductDto {
  const productDto = new ProductDto();
  productDto.name = 'Milk update';
  productDto.purchasePrice = 3000;
  productDto.salePrice = 3000;
  productDto.businessId = 1;

  return productDto;
}
