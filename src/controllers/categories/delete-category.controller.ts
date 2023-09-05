import {inject} from '@loopback/core';
import {CategoryServiceInterface} from '../../services/contracts/category-service.interface';
import {del, param, response} from '@loopback/rest';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt-custom')
export class DeleteCategoryController {
  constructor(@inject('services.CategoryService')
              private categoryService : CategoryServiceInterface,) {}

  @del('/categories/{id}')
  @response(204, {
    description: 'Category delete',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.categoryService.deleteCategory(id);
  }
}
