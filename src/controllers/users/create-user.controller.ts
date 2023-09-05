import {inject} from '@loopback/core';
import {getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
import {ProductDto} from '../../dtos/product.dto';
import {UserServiceInterface} from '../../services/contracts/user-service.interface';
import {UserDto} from '../../dtos/user.dto';

export class CreateUserController {
  constructor(
    @inject('services.UserService')
    private userService: UserServiceInterface,
  ) {
  }

  @post('/users')
  @response(200, {
    description: 'user create',
    content: {'application/json': {schema: getModelSchemaRef(ProductDto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {type: 'string'},
              email: {type: 'string'},
              password: {type: 'string'},
            },
            required: ['name', 'email', 'password'],
          },
        },
      },
    })
      user: Omit<UserDto, 'id'>,
  ): Promise<UserDto> {
    return this.userService.createUser(user);
  }
}