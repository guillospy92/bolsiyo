import {ProductDto} from '../../dtos/product.dto';

export interface ProductServiceInterface {
  createProduct(product: ProductDto): Promise<ProductDto>;
  updateProduct(product: ProductDto): Promise<void>;
  deleteProduct(productId: number): Promise<void>
  updateStockProduct(productId: number, stock: number): Promise<void>;
  listProductByBusiness(businessId:number): Promise<ProductDto[]>
}