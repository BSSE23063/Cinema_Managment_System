// auth/role.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';
import { Role_key } from './roles.decorators';
import { BlacklistService } from 'src/blacklist/blacklist.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector
,private readonly blacklistservice:BlacklistService

  ) {}

async  canActivate(context: ExecutionContext): Promise<boolean> {
    // Skip guard if route is public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(Role_key, [
      context.getHandler(),
      context.getClass(),
    ]);

  if (!requiredRoles) {
  return true; // no role restriction
}
const request = context.switchToHttp().getRequest();
const authHeader = request.headers.authorization;
      
      if (authHeader) {
        const [bearer, token] = authHeader.split(' ');
        
        const verify =await this.blacklistservice.findOnebytoken(token);
        if (verify) {
          throw new UnauthorizedException('Token is expired');
        }
      }

const { user } = context.switchToHttp().getRequest();

if (!user || !user.role) {
  throw new UnauthorizedException('User or role missing');
}
console.log(requiredRoles);
console.log(user.role.role);

if(requiredRoles.includes(user.role.role)){
    return true;
}
throw new UnauthorizedException('You do not have permission');

}
}
