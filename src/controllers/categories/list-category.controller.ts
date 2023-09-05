import {
  response, get, param,

} from '@loopback/rest';

import {inject} from '@loopback/core';
import {CategoryServiceInterface} from '../../services/contracts/category-service.interface';
import {CategoryDto} from '../../dtos/bussiness.dto';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt-custom')
export class ListCategoryController {
  constructor(
    @inject('services.CategoryService')
    private categoryService: CategoryServiceInterface,
  ) {
  }

  @get('/categories/business/{businessId}')
  @response(200, {
    description: 'Category lists by business',
  })
  async list(@param.path.number('businessId') businessId: number): Promise<CategoryDto[]> {
    return this.categoryService.listCategoryByBusiness(businessId);
  }
}
