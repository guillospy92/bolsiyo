import {inject} from '@loopback/core';
import {del, param, response} from '@loopback/rest';
import {ProductServiceInterface} from '../../services/contracts/product-service.interface';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt-custom')
export class DeleteProductController {
  constructor(@inject('services.ProductService')
              private productService : ProductServiceInterface,) {}

  @del('/products/{id}')
  @response(204, {
    description: 'Product delete',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productService.deleteProduct(id);
  }
}
