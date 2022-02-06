import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const headerData = request.headers.authorization;
    if (!headerData) {
      throw new UnauthorizedException();
    }
    const token = headerData.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      this.jwtService.verify(token);
      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
