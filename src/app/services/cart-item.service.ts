import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiCartItem } from '../constant/api';
import { CartItemRequest, ICartItem, ICartItemRequest, IResponseCartIem } from '../types/cart-item';
import { IResponseProduct } from '../types/product';

@Injectable({ providedIn: 'root' })
export class CartItemService {
  constructor(private http: HttpClient) { }

  deleteCartItem(cartItem: ICartItem): Observable<IResponseCartIem>{
    return this.http.delete<IResponseCartIem>(`${apiCartItem.deleteCartItem}${cartItem.id}`)
  }
  deleteAllCartItem(idCart: number): Observable<IResponseCartIem>{
    return this.http.delete<IResponseCartIem>(`${apiCartItem.deleteAllCartItem}${idCart}`)
  }

  updateQuantity(idCartItem: number, cartItemRequest: ICartItem): Observable<IResponseCartIem>{
    return this.http.put<IResponseCartIem>(`${apiCartItem.updateQuantity}${idCartItem }`, cartItemRequest)
  }

  updateRate(idCartItem: number, cartItemRequest: ICartItem): Observable<IResponseCartIem>{
    return this.http.put<IResponseCartIem>(`${apiCartItem.updateRate}${idCartItem }`, cartItemRequest)
  }

  updateIsPlus(idCartItem: any, cartItemRequest: ICartItem): Observable<IResponseCartIem>{
    return this.http.put<IResponseCartIem>(`${apiCartItem.updateIsPlus}${idCartItem }`, cartItemRequest)
  }

  addCartItem(idProduct: number, productDetails: ICartItemRequest ,idUser : number): Observable<IResponseProduct> {
    return this.http.post<IResponseProduct>(`${apiCartItem.addCartItem}?idProduct=${idProduct}&idUser=${idUser}`,productDetails)
}
  
}