import {givenEmptyDataBase} from '../../../helpers/database.helper';
import {expect} from '@loopback/testlab';
import {getServiceApplication} from '../../../instances/test-instances.memory';
import {DeleteProductController} from '../../../../controllers/products/delete-product.controller';
import {givenProduct} from '../../../helpers/create-product.helper';

const assert = require('chai').assert;

describe('DeleteProductController (integration)', () => {
  beforeEach(givenEmptyDataBase);
  it('delete product success', async () => {
    try {
      const product = await givenProduct();
      await getController().deleteById(product.id ?? 1)
    } catch (e) {
      assert.fail();
    }
  });

  it('delete product id not exists', async () => {
    try {
      await getController().deleteById(0)
      assert.fail();
    } catch (e) {
      expect(e.message).eql('Entity not found: products with id 0');
    }
  });
});

function getController(): DeleteProductController {
  const serviceApplication = getServiceApplication();
  return new DeleteProductController(
    serviceApplication.productService,
  );
}
