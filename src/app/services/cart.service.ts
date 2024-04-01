import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICart, ICartCustomer, IResponseCart, IUpdateCart } from '../types/cart';
import { apiCart } from '../constant/api';
import { ICustomer } from '../types/customer';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient, private userService: UserService) { }

  getCart(idUser: number): Observable<IResponseCart> {
    const headers = this.userService.header()
    return this.http.get<IResponseCart>(`${apiCart.getCart}${idUser}`, {headers})
  }

  updateCartCustomer(idCart: number, customerRequest: IUpdateCart): Observable<IResponseCart> {
    const headers = this.userService.header()
    return this.http.put<IResponseCart>(`${apiCart.updateCart}${idCart}`, customerRequest, {headers})
  }
}