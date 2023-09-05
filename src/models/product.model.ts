import {belongsTo, Entity, model, property} from '@loopback/repository';
import {BusinessModel} from './business.model';
import {CategoryModel} from './category.model';

@model({
  name: 'products',
})
export class ProductModel extends Entity {
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

  @property({
    type: 'number',
    dataType: 'decimal',
    precision: 10,
    scale: 3,
    mysql: {
      columnName: 'purchased_price',
    },
    required: true,
  })
  purchasePrice: number;

  @property({
    type: 'number',
    dataType: 'decimal',
    precision: 10,
    scale: 3,
    mysql: {
      columnName: 'sale_price',
    },
    required: true,
  })
  salePrice: number;

  @property({
    type: 'number',
    required: true,
  })
  stock: number;

  @belongsTo(() => BusinessModel, {keyFrom: 'businessId'}, {name: 'business_id'})
  businessId:number;

  @belongsTo(() => CategoryModel, {keyFrom: 'categoryId'}, {name: 'category_id'})
  categoryId:number;

  @property({
    dataType: 'datetime',
    type: 'date',
    required: true,
    mysql: {
      columnName: 'created_at',
    },
  })
  createdAt: Date;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProductModel>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = ProductModel & ProductRelations;
