export interface IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: Rol;
}

export enum Rol {
  USER,
  ADMIN,
  SELLER,
  CUSTOMER,
}
