import { IUser } from '../users/iuser';

export interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  seller: IUser;
  createdAt: Date;
  updatedAt: Date;
}
