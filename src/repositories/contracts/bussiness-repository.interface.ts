export interface BusinessRepositoryInterface {
  verifyIfExistsBusiness(businessId:number): Promise<boolean>
}