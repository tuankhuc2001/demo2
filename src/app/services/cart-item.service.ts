import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiCartItem } from '../constant/api';
import { CartItemRequest, ICartItem } from '../types/cart-item';

@Injectable({ providedIn: 'root' })
export class CartItemService {
  constructor(private http: HttpClient) { }

  deleteCartItem(idCartItem: any): Observable<any>{
    return this.http.delete<any>(`${apiCartItem.deleteCartItem}${idCartItem.id}`)
  }
  deleteAllCartItem(idCart: any): Observable<any>{
    return this.http.delete<any>(`${apiCartItem.deleteAllCartItem}${idCart}`)
  }

  updateQuantity(idCartItem: any, cartItemRequest: ICartItem): Observable<any>{
    return this.http.put<any>(`${apiCartItem.updateQuantity}${idCartItem }`, cartItemRequest)
  }

  updateRate(idCartItem: any, cartItemRequest: ICartItem): Observable<any>{
    return this.http.put<any>(`${apiCartItem.updateRate}${idCartItem }`, cartItemRequest)
  }

  updateIsPlus(idCartItem: any, cartItemRequest: ICartItem): Observable<any>{
    return this.http.put<any>(`${apiCartItem.updateIsPlus}${idCartItem }`, cartItemRequest)
  }
  
}