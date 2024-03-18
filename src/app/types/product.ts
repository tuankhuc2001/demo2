import { ICartItem } from "./cart-item";

export interface IProduct {
  id: number;
  nameProduct: String;
  quantityProduct: number ;
  expiredDate: string;
  provider: string;
  unit: string;
  origin: string;
  avatar: string;
  codeProduct: string;
  description: string;
  providePrice: number;
  floorPrice: number;
  phoneProvider: string;
}

export interface IResponseProduct {
  message: string,
  status: boolean,
  content: {
    list: IProduct[],
    totalCartItem: number,
  }
}
