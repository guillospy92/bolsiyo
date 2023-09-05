import {UserDto} from '../../dtos/user.dto';

export interface UserServiceInterface {
  createUser(user: UserDto): Promise<UserDto>;
}