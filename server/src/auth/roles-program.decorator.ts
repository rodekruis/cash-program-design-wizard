import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '../users/enum/user-role.enum';

export const RolesProgram = (...roles: UserRoleEnum[]): any =>
  SetMetadata('roles', roles);
