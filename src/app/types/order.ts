import { ICustomer } from './customer';
export interface IOder {
  id: number;
  idUser: number;
  Customer: ICustomer;
  totalPrice: number;
  status: string;
  createdAt?: Date;
  totalCartItem: number;
  color: string;
  codeOder: string;
}

export interface IAddOder {
  totalPrice: number;
}

export interface IOrderResponse {
  message: string,
  status: boolean,
  content: {
  }
}
