import {juggler} from '@loopback/repository';

export const testDbMemory: juggler.DataSource = new juggler.DataSource({
  name : 'db',
  connector: 'memory'
})
