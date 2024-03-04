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
