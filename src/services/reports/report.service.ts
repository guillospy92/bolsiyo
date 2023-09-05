import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {ReportsRepositoryInterface} from '../../repositories/contracts/reports-repository.interface';
import {ReportProductDto} from '../../dtos/report-product.dto';
import {repository} from '@loopback/repository';
import {ReportLoopBackRepository} from '../../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class ReportService implements ReportsRepositoryInterface{

  constructor(@repository(ReportLoopBackRepository)
              public reportRepository: ReportsRepositoryInterface,) {
  }

  getProductsByDates(startDate: string, endDate: string): Promise<ReportProductDto[]> {
    return this.reportRepository.getProductsByDates(startDate, endDate);
  }
}
