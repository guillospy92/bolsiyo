
import {
  post,
  getModelSchemaRef,
  requestBody,
  response, HttpErrors,

} from '@loopback/rest';

import {inject} from '@loopback/core';
import {CategoryServiceInterface} from '../../services/contracts/category-service.interface';
import {CategoryDto} from '../../dtos/bussiness.dto';
import {BusinessServiceInterface} from '../../services/contracts/business-service.interface';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt-custom')
export class CreateCategoryController {
  constructor(
    @inject('services.CategoryService')
    private categoryService : CategoryServiceInterface,
    @inject('services.BusinessService')
    private businessService : BusinessServiceInterface
  ) {
  }

  @post('/categories')
  @response(200, {
    description: 'Category create',
    content: {'application/json': {schema: getModelSchemaRef(CategoryDto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {type : 'string'},
              businessId: { type: 'number'},
            },
            required: ['name', 'businessId'],
          }
        },
      },
    })
      category: Omit<CategoryDto, 'id'>,
  ): Promise<CategoryDto> {

    if (! await this.businessService.verifyIfExistsBusiness(category.businessId)) {
      throw new HttpErrors.BadRequest('error not exist business');
    }

    return this.categoryService.createCategory(category);
  }
}
