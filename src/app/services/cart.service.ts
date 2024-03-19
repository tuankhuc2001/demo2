import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICartCustomer, IResponseCart } from '../types/cart';
import { apiCart } from '../constant/api';
import { ICustomer } from '../types/customer';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient) { }

  getCart(idUser: number): Observable<IResponseCart> {
    return this.http.get<IResponseCart>(`${apiCart.getCart}${idUser}`)
  }

  updateCartCustomer(idCart: number, customerRequest: ICustomer): Observable<IResponseCart> {
    return this.http.put<IResponseCart>(`${apiCart.updateCart}${idCart}`, customerRequest)
  }
}