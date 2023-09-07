import {ProductModel} from '../../models';
import {testDbMemory} from '../data-soruce/data-source-memory';
import {ProductLoopBackRepository} from '../../repositories';

export function givenProductData(data?: Partial<ProductModel>) {
  return Object.assign(
    {
      name : 'product',
      purchasePrice : 1000,
      salePrice: 1000,
      stock: 1,
      businessId: 1,
      categoryId: 1,
      createdAt: new Date()
    },
    data,
  );
}

export async function givenProduct(data?: Partial<ProductModel>): Promise<ProductModel> {
  return new ProductLoopBackRepository(testDbMemory).create(givenProductData(data));
}