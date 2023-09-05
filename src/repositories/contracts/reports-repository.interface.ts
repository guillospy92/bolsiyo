import {ReportProductDto} from '../../dtos/report-product.dto';

export interface ReportsRepositoryInterface {
  getProductsByDates(startDate: string, endDate: string): Promise<ReportProductDto[]>;
}