import { ICustomer } from './customer';
import { IUser } from './user';
import { IOrderDetail } from './order-detail';

export interface IOrder {
  id: number
  totalPrice: number
  status: string
  createdAt: Date
  totalCartItem: number
  codeOrder: string
  User: IUser
  customerResponse: ICustomer
}


export interface IOrderResponse {
  message: string,
  status: boolean,
  content: {
  }
}
export interface IOrderAndOrderDetail {
  id: number
  totalPrice: number
  status: string
  createdAt?: Date
  totalCartItem: number
  codeOrder: string
  userResponse: IUser
  customerResponse: ICustomer
  orderDetailResponseList: IOrderDetail[],
}

export interface IResponseOrder {
  message: string,
  status: boolean,
  content: {
    list: IOrder[],
  }
}

export interface IResponseOrderAndOrderDetails {
  message: string,
  status: boolean,
  content: {
    list: IOrderAndOrderDetail[],
  }
}
