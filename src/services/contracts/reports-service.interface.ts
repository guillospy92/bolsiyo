import {ReportProductDto} from '../../dtos/report-product.dto';

export interface ReportsServiceInterface {
  getProductsByDates(startDate: string, endDate: string): Promise<ReportProductDto[]>;
}