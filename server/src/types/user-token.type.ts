import { UserRoleEnum } from 'src/users/enum/user-role.enum';

export interface UserToken {
  id: string;
  userName: string;
  exp: number;
  roles: {
    [_programId: string]: UserRoleEnum;
  };
}
