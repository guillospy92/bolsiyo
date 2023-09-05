import {get, HttpErrors, param, response} from '@loopback/rest';
import {inject} from '@loopback/core';
import {isValidDate} from '../../commons/dates/validate-dates';
import {ReportsServiceInterface} from '../../services/contracts/reports-service.interface';
import {ReportProductDto} from '../../dtos/report-product.dto';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt-custom')
export class ReportsProductController {
  constructor(
    @inject('services.ReportService')
    private reportService: ReportsServiceInterface,
  ) {

  }
  @get('reports/products')
  @response(200, {
    description: 'reports products',
  })
  async list(
    @param.query.string('startDate') startDate: string,
    @param.query.string('endDate') endDate: string,
  ): Promise<ReportProductDto[]> {
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      throw new HttpErrors.BadRequest('error format date incorrect');
    }
    return this.reportService.getProductsByDates(startDate, endDate);
  }
}