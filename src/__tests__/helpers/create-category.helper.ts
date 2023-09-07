import {CategoryModel} from '../../models';
import {testDbMemory} from '../data-soruce/data-source-memory';
import {CategoryLoopBackRepository} from '../../repositories';

export function givenCategoryData(data?: Partial<CategoryModel>) {
  return Object.assign(
    {
      name : 'category',
    },
    data,
  );
}

export async function givenCategory(data?: Partial<CategoryModel>): Promise<CategoryModel> {
  return new CategoryLoopBackRepository(testDbMemory).create(givenCategoryData(data));
}