import { ICart } from "./cart";
import { IProduct } from "./product";
export interface ICartItem {
  id: number;
  Product: IProduct;
  idCart: number;
  quantity: number;
  rate: number;
  plus: boolean;
  editPrice: number;
  isDisable: boolean;
}

export interface IResponseCartIem {
  message: string,
  status: boolean,
  content: {
    list: ICartItem[],
    totalCartItem: number,
  }
}

export interface CartItemRequest {
  quantity: number,
  rate: number,
  plus: boolean,
  editPrice: number,
  floorPrice: number,
  idCart: ICart,
}
