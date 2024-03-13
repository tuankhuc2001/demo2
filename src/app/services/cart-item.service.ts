import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiCartItem } from '../constant/api';

@Injectable({ providedIn: 'root' })
export class CartItemService {
  constructor(private http: HttpClient) { }

  deleteCartItem(idCartItem: any): Observable<any>{
    return this.http.delete<any>(`${apiCartItem.deleteCartItem}${idCartItem.id}`)
  }
  deleteAllCartItem(idCart: any): Observable<any>{
    return this.http.delete<any>(`${apiCartItem.deleteAllCartItem}${idCart}`)
  }
  
}