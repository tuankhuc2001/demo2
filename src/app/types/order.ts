import { ICustomer } from './customer';
import { IUser } from './user';

export interface IOrder {
  id: number
  totalPrice: number
  status: string
  createdAt?: Date
  totalCartItem: number
  codeOrder: string
  User: IUser
  customerResponse: ICustomer
}

export interface IAddOder {
  totalPrice: number;
}

export interface IOrderResponse {
  message: string,
  status: boolean,
  content: {}
}

export interface IResponseOrder {
  message: string,
  status: boolean,
  content: {
    list: IOrder[],
  }
}
