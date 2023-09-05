
import {
  post,
  getModelSchemaRef,
  requestBody,
  response, HttpErrors,

} from '@loopback/rest';

import {inject} from '@loopback/core';

import {BusinessServiceInterface} from '../../services/contracts/business-service.interface';
import {ProductServiceInterface} from '../../services/contracts/product-service.interface';
import {ProductDto} from '../../dtos/product.dto';
import {CategoryServiceInterface} from '../../services/contracts/category-service.interface';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt-custom')
export class CreateProductController {
  constructor(
    @inject('services.ProductService')
    private productService : ProductServiceInterface,
    @inject('services.BusinessService')
    private businessService : BusinessServiceInterface,
    @inject('services.CategoryService')
    private categoryService: CategoryServiceInterface
  ) {
  }

  @post('/products')
  @response(200, {
    description: 'Product create',
    content: {'application/json': {schema: getModelSchemaRef(ProductDto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {type : 'string'},
              purchasePrice: {type: 'number'},
              salePrice: {type: 'number'},
              stock: {type: 'integer'},
              businessId: { type: 'integer'},
              categoryId: { type: 'integer'},
            },
            required: ['name', 'purchasePrice', 'salePrice', 'stock', 'businessId', 'categoryId'],
          }
        },
      },
    })
      product: Omit<ProductDto, 'id'>,
  ): Promise<ProductDto> {

    if (! await this.businessService.verifyIfExistsBusiness(product.businessId)) {
      throw new HttpErrors.BadRequest('error not exist business');
    }

    if (! await this.categoryService.verifyIfExistsCategory(product.categoryId)) {
      throw new HttpErrors.BadRequest('error not exist category');
    }

    return this.productService.createProduct(product);
  }
}
