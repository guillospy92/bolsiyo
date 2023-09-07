import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnectionMysqlDataSource} from '../../datasources';
import {CategoryModel, CategoryRelations} from '../../models';
import {CategoryDto} from '../../dtos/bussiness.dto';
import {CategoryRepositoryInterface} from '../contracts/category-repository.interface';

export class CategoryLoopBackRepository extends DefaultCrudRepository<
  CategoryModel,
  typeof CategoryDto.prototype.id,
  CategoryRelations
> implements CategoryRepositoryInterface {
  constructor(
    @inject('datasources.connection_mysql') dataSource: ConnectionMysqlDataSource,
  ) {
    super(CategoryModel, dataSource);
  }

  createCategory(category: CategoryDto): Promise<CategoryDto> {
    return this.create(category);
  }

  async listCategoryByBusiness(businessId: number): Promise<CategoryDto[]> {
    const categories = await this.find({
      where: {
        businessId: businessId,
      },
    });

    return categories.map((category) => {
      return {...category};
    });
  }

  deleteCategory(categoryId: number): Promise<void> {
    const category = new CategoryModel();
    category.id = categoryId;
    return this.delete(category);
  }

  verifyIfExistsCategory(categoryId: number): Promise<boolean> {
    return this.exists(categoryId);
  }
}
