import {getModelSchemaRef, param, put, requestBody, response} from '@loopback/rest';
import {ProductDto} from '../../dtos/product.dto';
import {inject} from '@loopback/core';
import {ProductServiceInterface} from '../../services/contracts/product-service.interface';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt-custom')
export class UpdateProductController {
  constructor(
    @inject('services.ProductService')
    private productService : ProductServiceInterface,
  ) {
  }

@put('/products/{id}')
  @response(204, {
    description: 'Product update',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductDto, {partial: true}),
        },
      },
    })
    product: ProductDto,
  ): Promise<void> {
    product.id = id
    await this.productService.updateProduct(product);
  }
}