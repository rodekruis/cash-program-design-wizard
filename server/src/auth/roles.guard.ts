import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserToken } from 'src/types/user-token.type';
import { UserRoleEnum } from '../users/enum/user-role.enum';
import { UserEntity } from '../users/user.entity';
import { UserService } from '../users/user.service';
import jwt = require('jsonwebtoken');

@Injectable()
export class RolesGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    let hasAccess = false;

    const endpointRoles = this.reflector.get<UserRoleEnum[]>(
      'roles',
      context.getHandler(),
    );

    if (!endpointRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeaders = request.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const decoded: UserToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await this.userService.findById(decoded.id);
      hasAccess = await this.hasAccess(user, endpointRoles);
    }
    if (hasAccess === false) {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
    return hasAccess;
  }

  private async hasAccess(
    user: UserEntity,
    endpointRoles: UserRoleEnum[],
  ): Promise<boolean> {
    const userRoles = [];
    if (user.programAssignments) {
      for (const programAssignment of user.programAssignments) {
        userRoles.push(programAssignment.role);
      }
    }
    const overlappingRoles = userRoles.filter((role) =>
      endpointRoles.includes(role),
    );
    return overlappingRoles.length > 0;
  }
}
