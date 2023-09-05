import {ProductDto} from '../../dtos/product.dto';

export interface ProductRepositoryInterface {
  getProductById(productId:number): Promise<ProductDto>;
  createProduct(product: ProductDto): Promise<ProductDto>;
  updateProduct(product: ProductDto): Promise<void>
  deleteProduct(productId: number): Promise<void>
  listProductByBusiness(businessId:number): Promise<ProductDto[]>
  updateStockProduct(productId: number, stock: number): Promise<void>;
}