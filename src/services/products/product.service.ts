import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {ProductServiceInterface} from '../contracts/product-service.interface';
import {ProductDto} from '../../dtos/product.dto';
import {repository} from '@loopback/repository';

import {ProductRepositoryInterface} from '../../repositories/contracts/product-repository.interface';
import {ProductLoopBackRepository, TraceProductLoopBackRepository} from '../../repositories';
import {TraceProductRepositoryInterface} from '../../repositories/contracts/trace-product-repository-interface';
import {TraceProductDto} from '../../dtos/trace-product.dto';

@injectable({scope: BindingScope.TRANSIENT})
export class ProductService implements ProductServiceInterface {

  constructor(@repository(ProductLoopBackRepository)
              public productRepository: ProductRepositoryInterface,
              @repository(TraceProductLoopBackRepository)
              public traceProductRepository: TraceProductRepositoryInterface) {
  }

  createProduct(product: ProductDto): Promise<ProductDto> {
    product.createdAt = new Date();
    return this.productRepository.createProduct(product);
  }

  updateProduct(product: ProductDto): Promise<void> {
    // eslint-disable-next-line
    const {businessId, categoryId, stock, ...updatedProduct} = product;
    return this.productRepository.updateProduct(product);
  }

  deleteProduct(productId: number): Promise<void> {
    return this.productRepository.deleteProduct(productId);
  }

  listProductByBusiness(businessId: number): Promise<ProductDto[]> {
    return this.productRepository.listProductByBusiness(businessId);
  }

  async updateStockProduct(productId: number, stock: number): Promise<void> {
    const product = await this.productRepository.getProductById(productId);
    const newStock= product.stock + stock;
    const oldStock = product.stock;

    // save trace
    const traceProduct = new TraceProductDto();
    traceProduct.newStock = newStock;
    traceProduct.oldStock = oldStock;
    traceProduct.productId = productId;
    traceProduct.createdAt = new Date();

    await this.traceProductRepository.createTraceProduct(traceProduct)
    return this.productRepository.updateStockProduct(productId, newStock);
  }
}
