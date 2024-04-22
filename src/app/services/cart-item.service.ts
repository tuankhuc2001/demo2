import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiCartItem } from '../constant/api';
import { ICartItem, ICartItemRequest, IResponseCartIem } from '../types/cart-item';
import { IResponseProduct } from '../types/product';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class CartItemService {
  constructor(private http: HttpClient, private userService: UserService) { }
  
  deleteCartItem(idCartItem: number): Observable<IResponseCartIem>{
    const headers = this.userService.header()
    return this.http.delete<IResponseCartIem>(`${apiCartItem.deleteCartItem}${idCartItem}`, {headers})
  }
  deleteAllCartItem(idCart: number): Observable<IResponseCartIem>{
    const headers = this.userService.header()
    return this.http.delete<IResponseCartIem>(`${apiCartItem.deleteAllCartItem}${idCart}`, {headers})
  }

  updateQuantity(idCartItem: number, cartItemRequest: ICartItem): Observable<IResponseCartIem>{
    const headers = this.userService.header()
    return this.http.put<IResponseCartIem>(`${apiCartItem.updateQuantity}${idCartItem }`, cartItemRequest, {headers})
  }

  updateRate(idCartItem: number, cartItemRequest: ICartItem): Observable<IResponseCartIem>{
    const headers = this.userService.header()
    return this.http.put<IResponseCartIem>(`${apiCartItem.updateRate}${idCartItem }`, cartItemRequest, {headers})
  }

  updateIsPlus(idCartItem: any, cartItemRequest: ICartItem): Observable<IResponseCartIem>{
    const headers = this.userService.header()
    return this.http.put<IResponseCartIem>(`${apiCartItem.updateIsPlus}${idCartItem }`, cartItemRequest, {headers})
  }

  addCartItem(idProduct: number, productDetails: ICartItemRequest ,idUser : number): Observable<IResponseProduct> {
    const headers = this.userService.header()
    return this.http.post<IResponseProduct>(`${apiCartItem.addCartItem}?idProduct=${idProduct}&idUser=${idUser}`,productDetails, {headers})
}
  
}