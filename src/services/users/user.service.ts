import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {UserServiceInterface} from '../contracts/user-service.interface';
import {UserDto} from '../../dtos/user.dto';
import {repository} from '@loopback/repository';
import {UserLoopBackRepository} from '../../repositories';
import {UserRepositoryInterface} from '../../repositories/contracts/user-repository.interface';
import {hasPassword} from '../../commons/hash/bcrypt';

@injectable({scope: BindingScope.TRANSIENT})
export class UserService implements UserServiceInterface{
  constructor(@repository(UserLoopBackRepository)
              public userRepository: UserRepositoryInterface,) {
  }

  async createUser(user: UserDto): Promise<UserDto> {
    user.password = await hasPassword(user.password);
    return this.userRepository.createUser(user);
  }
}
