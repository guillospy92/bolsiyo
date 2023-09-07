import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnectionMysqlDataSource} from '../../datasources';
import {ProductModel, ProductRelations} from '../../models';
import {ProductDto} from '../../dtos/product.dto';
import {ProductRepositoryInterface} from '../contracts/product-repository.interface';

export class ProductLoopBackRepository extends DefaultCrudRepository<
  ProductModel,
  typeof ProductDto.prototype.id,
  ProductRelations
> implements ProductRepositoryInterface {
  constructor(
    @inject('datasources.connection_mysql') dataSource: ConnectionMysqlDataSource,
  ) {
    super(ProductModel, dataSource);
  }

  getProductById(productId:number): Promise<ProductDto> {
    return this.findById(productId);
  }

  createProduct(product: ProductDto): Promise<ProductDto> {
    return this.create(product as ProductDto);
  }

  updateProduct(product: ProductDto): Promise<void> {
    return this.updateById(product.id, product);
  }

  deleteProduct(productId: number): Promise<void> {
    const productEntity = new ProductModel();
    productEntity.id = productId;
    return this.delete(productEntity);
  }

  async listProductByBusiness(businessId: number): Promise<ProductDto[]> {
    const products =  await this.find({
      where: {
        businessId: businessId,
      },
    });

    return products.map((product) => {
      return {...product};
    });
  }

  updateStockProduct(productId: number, stock: number): Promise<void> {
    return this.updateById(productId, {stock : stock});
  }
}
