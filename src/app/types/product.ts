export interface IProduct {
  id: number;
  nameProduct: String;
  quantityProduct: number;
  expiredDate: Date;
  provider: string;
  unit: string;
  origin: string;
  avatar: any;
  codeProduct: string;
  description: string;
  providePrice: number;
  floorPrice: number;
}

export interface IResponseProduct {
  message: string,
  status: boolean,
  content: {
    list: IProduct[],
    totalCartItem: number,
  }
}
