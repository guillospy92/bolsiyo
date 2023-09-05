import {TraceProductDto} from '../../dtos/trace-product.dto';

export interface TraceProductRepositoryInterface {
  createTraceProduct(traceProduct: TraceProductDto): Promise<TraceProductDto>;
}