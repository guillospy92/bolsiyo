import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnectionMysqlDataSource} from '../../datasources';
import {User, UserRelations} from '../../models';
import {UserRepositoryInterface} from '../contracts/user-repository.interface';
import {UserDto} from '../../dtos/user.dto';

export class UserLoopBackRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> implements UserRepositoryInterface{
  constructor(
    @inject('datasources.connection_mysql') dataSource: ConnectionMysqlDataSource,
  ) {
    super(User, dataSource);
  }

  createUser(user: UserDto): Promise<UserDto> {
    return this.create(user);
  }

  getUserByEmail(userEmail: string): Promise<UserDto| null> {
    return this.findOne({
      where: {
        email: userEmail,
      },
    });
  }
}
