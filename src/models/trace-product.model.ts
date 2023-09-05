import {belongsTo, Entity, model, property} from '@loopback/repository';
import {ProductModel} from './product.model';

@model({
  name : 'trace_products'
})
export class TraceProductModel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    mysql: {
      columnName: 'old_stack',
    },
    required: true,
  })
  oldStock: number;

  @property({
    type: 'number',
    mysql: {
      columnName: 'new_stack',
    },
    required: true,
  })
  newStock: number;

  @belongsTo(() => ProductModel, {keyFrom: 'productId'}, {name: 'product_id'})
  productId:number

  @property({
    dataType: 'datetime',
    type: 'date',
    required: true,
    mysql: {
      columnName: 'created_at',
    },
  })
  createdAt: Date;


  constructor(data?: Partial<TraceProductModel>) {
    super(data);
  }
}

export interface TraceProductRelations {
  // describe navigational properties here
}

export type TraceProductWithRelations = TraceProductModel & TraceProductRelations;
