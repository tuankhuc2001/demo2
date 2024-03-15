import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ICartItemRequest } from '../types/cart-item';
import { IResponseProduct } from '../types/product';
import { Observable } from 'rxjs';
import { apiCartItem } from '../constant/api';

@Injectable({providedIn: 'root'})
export class CartItemService {
    constructor(private http : HttpClient) { }

    addCartItem(idProduct: number, productDetails: ICartItemRequest ,idUser : number): Observable<IResponseProduct> {
        return this.http.post<IResponseProduct>(`${apiCartItem.addCartItem}?idProduct=${idProduct}&idUser=${idUser}`,productDetails)
    }
    
}