import { ICart } from "./cart";
import { IProduct } from "./product";
export interface ICartItem {
  id: number;
  productResponse: IProduct;
  idCart: number;
  quantity: number;
  rate: number;
  plus: boolean;
  editPrice: number;
  disable: boolean;
}

export interface IResponseCartIem {
  message: string,
  status: boolean,
  content: {
    list: ICartItem[],
    totalCartItem: number,
  }
}
  
export interface ICartResponse {
  message: string,
  status: boolean,
  content: {
    list: IProduct[],
    totalCartItem: number,
  }
}

export interface CartItemRequest {
  quantity: number,
  rate: number,
  plus: boolean,
  editPrice: number,
  floorPrice: number,
  idCart: number,
}

export interface ICartItemRequest {
  quantity: number,
  rate: number,
  plus: boolean,
  editPrice: number,
  floorPrice: number,
}
