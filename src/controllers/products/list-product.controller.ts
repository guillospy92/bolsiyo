import {
  response, get, param,

} from '@loopback/rest';

import {inject} from '@loopback/core';
import {ProductServiceInterface} from '../../services/contracts/product-service.interface';
import {ProductDto} from '../../dtos/product.dto';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt-custom')
export class ListProductController {
  constructor(
    @inject('services.ProductService')
    private productService: ProductServiceInterface,
  ) {
  }

  @get('/products/business/{businessId}')
  @response(200, {
    description: 'Product lists by business',
  })
  async list(@param.path.number('businessId') businessId: number): Promise<ProductDto[]> {
    return this.productService.listProductByBusiness(businessId);
  }
}
