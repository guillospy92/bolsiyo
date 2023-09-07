import {BusinessModel} from '../../models';
import {testDbMemory} from '../data-soruce/data-source-memory';
import {BusinessLoopBackRepository} from '../../repositories';

export function givenBusinessData(data?: Partial<BusinessModel>) {
  return Object.assign(
    {
      name : 'business',
    },
    data,
  );
}

export async function givenBusiness(data?: Partial<BusinessModel>): Promise<BusinessModel> {
  return new BusinessLoopBackRepository(testDbMemory).create(givenBusinessData(data));
}