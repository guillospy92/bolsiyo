import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {ProductModel} from './product.model';
import {BusinessModel} from './business.model';

@model({
  name : 'categories'
})
export class CategoryModel extends Entity {

  @property({
    id: true,
    generated: true
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name:string;

  @hasMany(() => ProductModel)
  products?: ProductModel[];

  @belongsTo(() => BusinessModel, {keyFrom: 'businessId'}, {name: 'business_id'})
  businessId:number;

  constructor(data?: Partial<CategoryModel>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = CategoryModel & CategoryRelations;
