export interface IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: Rol;
}

export enum Rol {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  CUSTOMER = 'CUSTOMER',
}
