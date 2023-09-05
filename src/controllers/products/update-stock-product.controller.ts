import {ProductServiceInterface} from '../../services/contracts/product-service.interface';
import {param, put, requestBody, response} from '@loopback/rest';
import {ProductDto} from '../../dtos/product.dto';

import {inject} from '@loopback/core';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt-custom')
export class UpdateStockProductController {
  constructor(
    @inject('services.ProductService')
    private productService : ProductServiceInterface,
  ) {
  }

  @put('/products/{id}/stock')
  @response(204, {
    description: 'Product updated stock',
  })
  async updateStock(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              stock: {type: 'integer'},
            },
            required: ['stock'],
          },
        },
      },
    })
      product: ProductDto,
  ): Promise<void> {
    product.id = id;
    await this.productService.updateStockProduct(id, product.stock);
  }
}