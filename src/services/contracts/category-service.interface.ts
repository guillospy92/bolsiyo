import {CategoryDto} from '../../dtos/bussiness.dto';

export interface CategoryServiceInterface {
  createCategory(category: CategoryDto): Promise<CategoryDto>;
  deleteCategory(categoryId: number): Promise<void>
  listCategoryByBusiness(businessId:number): Promise<CategoryDto[]>
  verifyIfExistsCategory(categoryId: number): Promise<boolean>;
}