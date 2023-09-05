export interface  BusinessServiceInterface {
  verifyIfExistsBusiness(businessId: number): Promise<boolean>;
}