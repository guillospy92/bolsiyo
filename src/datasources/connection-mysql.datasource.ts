import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'connection_mysql',
  connector: 'mysql',
  url: '',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT_MYSQL,
  user: process.env.DB_USERNAME_MYSQL,
  password: process.env.DB_PASSWORD_MYSQL,
  database: process.env.DB_DATABASE_MYSQL
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ConnectionMysqlDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'connection_mysql';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.connection_mysql', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
