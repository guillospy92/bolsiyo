import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnectionMysqlDataSource} from '../../datasources';

import {TraceProductRepositoryInterface} from '../contracts/trace-product-repository-interface';
import {TraceProductDto} from '../../dtos/trace-product.dto';
import {TraceProductModel, TraceProductRelations} from '../../models';

export class TraceProductLoopBackRepository extends DefaultCrudRepository<
  TraceProductModel,
  typeof TraceProductModel.prototype.id,
  TraceProductRelations
> implements TraceProductRepositoryInterface{
  constructor(
    @inject('datasources.connection_mysql') dataSource: ConnectionMysqlDataSource,
  ) {
    super(TraceProductModel, dataSource);
  }

  createTraceProduct(traceProduct:TraceProductDto): Promise<TraceProductDto> {
    return this.create(traceProduct as TraceProductDto);
  }
}
