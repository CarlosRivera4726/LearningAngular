import { ICategory } from '../categories/icategory';
import { IUser } from '../users/iuser';

export interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  sellerId?: string;
  seller: IUser;
  categories: ICategory[];
  createdAt: Date;
  updatedAt: Date;
}
