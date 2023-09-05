import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {UserLoopBackRepository} from '../repositories';
import {UserRepositoryInterface} from '../repositories/contracts/user-repository.interface';
import {UserDto} from '../dtos/user.dto';
import {HttpErrors} from '@loopback/rest';
import {verifyPassword} from '../commons/hash/bcrypt';
import {generateJwt} from '../commons/hash/jwt';

@injectable({scope: BindingScope.TRANSIENT})
export class LoginService {
  constructor(@repository(UserLoopBackRepository)
              public userRepository: UserRepositoryInterface,) {
  }

  async generateToken(userModel: UserDto): Promise<string> {
    const user = await this.userRepository.getUserByEmail(userModel.email);
    if (!user) {
      throw new HttpErrors.Unauthorized('unauthorized user');
    }

    if (!await verifyPassword(userModel.password, user.password)) {
      throw new HttpErrors.Unauthorized('unauthorized user');
    }

    return generateJwt({name : user.name, email: user.email});
  }
}
