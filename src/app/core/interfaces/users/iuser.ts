export interface IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  roles: Rol[];
  createdAt: Date;
}

export class Rol {
  id!: string;
  name?: string;
}
