import {UserDto} from '../../dtos/user.dto';

export interface UserRepositoryInterface {
  createUser(user: UserDto): Promise<UserDto>;
  getUserByEmail(userEmail: string): Promise<UserDto| null>;
}