export enum UserRole {
  admin = 'admin',
  edit = 'edit',
  view = 'view',
}

export interface User {
  token?: string;
  id: string;
  userName: string;
  roles: UserRole[];
}
