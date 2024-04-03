import { IProduct } from "./product";

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

export interface IResponseOrderDetail {
  message: string,
  status: boolean,
  content: {
    list: IOrderDetail[],
  }
}