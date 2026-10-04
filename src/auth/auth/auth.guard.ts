import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Chưa cung cấp token');
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Token không hợp lệ');
    }

    try {
      this.jwtService.verify(token, {
        secret: 'my-secret-key',
      });

      return true;
    } catch {
      throw new UnauthorizedException(
        'Token hết hạn hoặc không hợp lệ',
      );
    }
  }
}