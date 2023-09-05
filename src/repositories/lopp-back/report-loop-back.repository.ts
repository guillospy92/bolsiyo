import {inject} from '@loopback/core';
import {ConnectionMysqlDataSource} from '../../datasources';

import {ReportsRepositoryInterface} from '../contracts/reports-repository.interface';
import {ReportProductDto} from '../../dtos/report-product.dto';
import {queryReportsProduct} from '../queries/reports/reports-product-date';

export class ReportLoopBackRepository implements ReportsRepositoryInterface {
  constructor(
    @inject('datasources.connection_mysql') private dataSource: ConnectionMysqlDataSource,
  ) {
  }

  getProductsByDates(startDate: string, endDate: string): Promise<ReportProductDto[]> {
    return this.dataSource.execute(queryReportsProduct, [startDate, endDate]);
  }
}
