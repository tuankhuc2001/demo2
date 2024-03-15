import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiCartItem } from '../constant/api';
import { CartItemRequest, ICartItem, IResponseCartIem } from '../types/cart-item';

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
  
}