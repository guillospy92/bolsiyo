import {injectable, BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CategoryLoopBackRepository} from '../../repositories';
import {CategoryDto} from '../../dtos/bussiness.dto';
import {CategoryServiceInterface} from '../contracts/category-service.interface';
import {CategoryRepositoryInterface} from '../../repositories/contracts/category-repository.interface';

@injectable({scope: BindingScope.TRANSIENT})
export class CategoryService implements CategoryServiceInterface{
  constructor(@repository(CategoryLoopBackRepository)
              public categoryRepository: CategoryRepositoryInterface,) {}

  createCategory(category: CategoryDto): Promise<CategoryDto> {
    return this.categoryRepository.createCategory(category)
  }

  deleteCategory(categoryId: number): Promise<void> {
    return this.categoryRepository.deleteCategory(categoryId);
  }

  listCategoryByBusiness(businessId: number): Promise<CategoryDto[]> {
    return this.categoryRepository.listCategoryByBusiness(businessId);
  }

  verifyIfExistsCategory(categoryId: number): Promise<boolean> {
    return this.categoryRepository.verifyIfExistsCategory(categoryId);
  }
}
