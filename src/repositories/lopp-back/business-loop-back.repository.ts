import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnectionMysqlDataSource} from '../../datasources';
import {BusinessModel, BusinessRelations} from '../../models';
import {BusinessRepositoryInterface} from '../contracts/bussiness-repository.interface';

export class BusinessLoopBackRepository extends DefaultCrudRepository<
  BusinessModel,
  typeof BusinessModel.prototype.id,
  BusinessRelations
> implements BusinessRepositoryInterface{
  constructor(
    @inject('datasources.connection_mysql') dataSource: ConnectionMysqlDataSource,
  ) {
    super(BusinessModel, dataSource);
  }

  verifyIfExistsBusiness(businessId: number): Promise<boolean> {
    return this.exists(businessId);
  }
}
