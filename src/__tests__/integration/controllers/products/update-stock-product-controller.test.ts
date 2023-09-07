import {givenEmptyDataBase} from '../../../helpers/database.helper';
import {expect} from '@loopback/testlab';
import {getRepositoryApplication, getServiceApplication} from '../../../instances/test-instances.memory';
import {givenProduct} from '../../../helpers/create-product.helper';
import {ProductDto} from '../../../../dtos/product.dto';
import {UpdateStockProductController} from '../../../../controllers/products/update-stock-product.controller';

describe('UpdatedProductStockController (integration)', () => {
  const productDto = new ProductDto();
  productDto.stock = 34;

  beforeEach(givenEmptyDataBase);

  it('update product stock success', async () => {
    const product = await givenProduct();

    const serviceApplication = getServiceApplication();
    const controller = new UpdateStockProductController(
      serviceApplication.productService,
    );

    await controller.updateStock(product.getId(), productDto)

    const wantStock = productDto.stock + product.stock;
    const productStockUpdated = await getRepositoryApplication().productRepository.findOne(product.getId());
    const productTrace = await getRepositoryApplication().traceProductRepository.findOne({
      where: {
        productId: product.id,
      },
    })
    expect(productTrace?.newStock).eql(wantStock)
    expect(productTrace?.oldStock).eql(product.stock);
    expect(productStockUpdated?.stock).eql(wantStock)
  });
})