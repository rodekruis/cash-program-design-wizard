export enum UserRole {
  admin = 'admin',
  edit = 'edit',
  view = 'view',
}

export interface User {
  token?: string;
  userName: string;
  roles: UserRole[];
}
