import {injectable, BindingScope} from '@loopback/core';
import {BusinessServiceInterface} from '../contracts/business-service.interface';
import {repository} from '@loopback/repository';
import {BusinessLoopBackRepository} from '../../repositories';
import {BusinessRepositoryInterface} from '../../repositories/contracts/bussiness-repository.interface';

@injectable({scope: BindingScope.TRANSIENT})
export class BusinessService implements BusinessServiceInterface{
  constructor(@repository(BusinessLoopBackRepository)
              public categoryRepository: BusinessRepositoryInterface,) {}

  verifyIfExistsBusiness(businessId: number): Promise<boolean> {
   return this.categoryRepository.verifyIfExistsBusiness(businessId);
  }
}
