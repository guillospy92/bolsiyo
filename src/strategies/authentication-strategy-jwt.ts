import {AuthenticationStrategy} from '@loopback/authentication';
import {UserProfile} from '@loopback/security';
import {HttpErrors, RedirectRoute, Request} from '@loopback/rest';
import {verifyJwt} from '../commons/hash/jwt';

export class AuthenticationStrategyJwt implements AuthenticationStrategy {
  name: string = 'jwt-custom';

  authenticate(request: Request): Promise<UserProfile | RedirectRoute | undefined> {
    const token = this.extractToken(request);

    if (!token) {
      throw new HttpErrors.Unauthorized('unauthorized user');
    }

    try {
      const userProfile = verifyJwt(token);
      return Promise.resolve(userProfile);
    } catch (error) {
      throw new HttpErrors.Unauthorized('unauthorized user');
    }
  }

  private extractToken(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return undefined;
    }

    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1];
    }

    return undefined;
  }
}