import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponseCart } from '../types/cart';
import { apiCart } from '../constant/api';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient) { }

  upload(payload: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/upload`,payload)}
  
  getCart(idUser: number): Observable<IResponseCart> {
    return this.http.get<IResponseCart>(`${apiCart.getCart}${idUser}`)
  }
}