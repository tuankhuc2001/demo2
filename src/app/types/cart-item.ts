import { IProduct } from "./product";
export interface ICartItem {
  id: number;
  Product: IProduct;
  idCart: number;
  quantity: number;
  rate: number;
  isPlus: boolean;
  editPrice: number;
  isDisable: boolean;
}

export interface ICartResponse {
  message: string,
  status: boolean,
  content: {
    list: IProduct[],
    totalCartItem: number,
  }
}

export interface ICartItemRequest {
  quantity: number,
  rate: number,
  plus: boolean,
  editPrice: number,
  floorPrice: number,
}