import { ICartItem } from "./cart-item";
import { ICustomer } from "./customer";
export interface ICart {
  id: number;
  idUser: number;
  Customer: ICustomer;
  CartItem: ICartItem;
}

export interface IResponseCart {
  message: string,
  status: boolean,
  content: {
    list: ICart[],
    totalCartItem: number,
  }
}

export interface ICartCustomer {
  Customer: ICustomer;
}