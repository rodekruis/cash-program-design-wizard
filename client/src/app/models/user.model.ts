export enum UserRole {
  admin = 'admin',
  edit = 'edit',
  review = 'review',
}

export interface User {
  token?: string;
  username: string;
  roles: UserRole[];
}
