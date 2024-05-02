import { IProduct } from "./product";
import { IUser } from "./user";
import { ICustomer } from "./customer";

export interface IOrderDetail {
  id: number
  quantity: number
  rate: number
  editPrice: number
  totalPriceProduct: number
  plus: boolean
  productResponse: IProduct
  imageUrl: string
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
  orderDetailResponseList: IOrderDetail[]
}

export interface IResponseOrderAndOrderDetails {
  message: string
  status: boolean
  content: {
    list: IOrderAndOrderDetail[]
  }
}