import {
  BusinessLoopBackRepository,
  CategoryLoopBackRepository,
  ProductLoopBackRepository,
  TraceProductLoopBackRepository,
} from '../../repositories';
import {testDbMemory} from '../data-soruce/data-source-memory';

export async function givenEmptyDataBase() {
  await new CategoryLoopBackRepository(testDbMemory).deleteAll();
  await new ProductLoopBackRepository(testDbMemory).deleteAll();
  await new BusinessLoopBackRepository(testDbMemory).deleteAll();
  await new TraceProductLoopBackRepository(testDbMemory).deleteAll();
}