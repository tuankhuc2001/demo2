import { ICustomer } from './customer';
import { IUser } from './user';
export interface IOrder {
  id: number;
  totalPrice: number;
  status: string;
  createdAt?: Date;
  totalCartItem: number;
  color: string;
  codeOrder: string;
  User: IUser;
  Customer: ICustomer;
}

export interface IResponseOrder {
  message: string,
  status: boolean,
  content: {
    list: IOrder[],
  }
}