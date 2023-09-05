import {inject} from '@loopback/core';
import {getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
import {ProductDto} from '../dtos/product.dto';
import {UserDto} from '../dtos/user.dto';
import {LoginService} from '../services';

export class LoginController {
  constructor(
    @inject('services.LoginService')
    private loginService: LoginService,
  ) {
  }

  @post('/login')
  @response(200, {
    description: 'Product create',
    content: {'application/json': {schema: getModelSchemaRef(ProductDto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {type: 'string'},
              password: {type: 'string'},
            },
            required: ['email', 'password'],
          },
        },
      },
    })
      user: Omit<UserDto, 'id'>,
  ): Promise<Object> {
    const token = await this.loginService.generateToken(user);
    return {
      token: token,
    };
  }
}