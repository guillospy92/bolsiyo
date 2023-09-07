import {CategoryRepositoryInterface} from '../../repositories/contracts/category-repository.interface';
import {BusinessRepositoryInterface} from '../../repositories/contracts/bussiness-repository.interface';
import {UserServiceInterface} from '../../services/contracts/user-service.interface';
import {
  BusinessLoopBackRepository, CategoryLoopBackRepository,
  ProductLoopBackRepository, ReportLoopBackRepository,
  TraceProductLoopBackRepository,
  UserLoopBackRepository,
} from '../../repositories';
import {testDbMemory} from '../data-soruce/data-source-memory';
import {BusinessService, CategoryService, ProductService, ReportService, UserService} from '../../services';
import {ProductServiceInterface} from '../../services/contracts/product-service.interface';
import {ReportsServiceInterface} from '../../services/contracts/reports-service.interface';

export interface RepositoryApplication {
  userRepository: UserLoopBackRepository,
  productRepository: ProductLoopBackRepository
  traceProductRepository: TraceProductLoopBackRepository
  categoryRepository: CategoryLoopBackRepository,
  businessRepository: BusinessLoopBackRepository,
  reportRepository: ReportLoopBackRepository
}

export interface ServicesApplication {
  userService: UserServiceInterface,
  productService: ProductServiceInterface,
  categoryService: CategoryRepositoryInterface,
  businessService: BusinessRepositoryInterface,
  reportService: ReportsServiceInterface
}

const cacheRepository: RepositoryApplication = {
  userRepository: new UserLoopBackRepository(testDbMemory),
  productRepository: new ProductLoopBackRepository(testDbMemory),
  traceProductRepository: new TraceProductLoopBackRepository(testDbMemory),
  businessRepository: new BusinessLoopBackRepository(testDbMemory),
  categoryRepository: new CategoryLoopBackRepository(testDbMemory),
  reportRepository: new ReportLoopBackRepository(testDbMemory)
}

const cacheService:ServicesApplication = {
  userService: new UserService(cacheRepository.userRepository),
  productService: new ProductService(cacheRepository.productRepository, cacheRepository.traceProductRepository),
  categoryService: new CategoryService(cacheRepository.categoryRepository),
  businessService: new BusinessService(cacheRepository.businessRepository),
  reportService: new ReportService(cacheRepository.reportRepository)
}

export function getRepositoryApplication(): RepositoryApplication {
  return cacheRepository
}

export function getServiceApplication(): ServicesApplication {
  return cacheService;
}

