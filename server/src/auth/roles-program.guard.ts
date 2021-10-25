import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoleEnum } from '../users/enum/user-role.enum';
import { UserEntity } from '../users/user.entity';
import { UserService } from '../users/user.service';
import jwt = require('jsonwebtoken');

@Injectable()
export class RolesProgramGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    let hasAccess: boolean;

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
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
      const user = await this.userService.findById(decoded.id);

      hasAccess = await this.hasAccess(user, endpointRoles, request);
    } else {
      hasAccess = false;
    }
    if (hasAccess === false) {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
    return hasAccess;
  }

  private async hasAccess(
    user: UserEntity,
    endpointRoles: UserRoleEnum[],
    request: any,
  ): Promise<boolean> {
    if (!request.params && !request.params.programId) {
      throw new HttpException(
        'Program id not in params.',
        HttpStatus.NOT_FOUND,
      );
    }

    const userRoles = [];
    if (user.programAssignments) {
      for (const programAssignment of user.programAssignments) {
        if (programAssignment.program.id === request.params.programId)
          userRoles.push(programAssignment.role);
      }
    }

    const overlappingRoles = userRoles.filter((role) =>
      endpointRoles.includes(role),
    );
    return overlappingRoles.length > 0;
  }
}
