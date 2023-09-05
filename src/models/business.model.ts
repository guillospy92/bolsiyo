import {Entity, hasMany, model, property} from '@loopback/repository';
import {ProductModel} from './product.model';
import {CategoryModel} from './category.model';

@model({
  name : 'business'
})
export class BusinessModel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => ProductModel)
  products?: ProductModel[]

  @hasMany(() => CategoryModel)
  categories?: CategoryModel[]

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<BusinessModel>) {
    super(data);
  }
}

export interface BusinessRelations {
  // describe navigational properties here
}

export type BusinessWithRelations = BusinessModel & BusinessRelations;
