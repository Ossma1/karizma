import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization) {
      return false;
    }

    const [username, password] = Buffer.from(
      authorization.split(' ')[1],
      'base64',
    )
      .toString('ascii')
      .split(':');
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      return false;
    }

    request.user = user;
    return true;
  }
}
