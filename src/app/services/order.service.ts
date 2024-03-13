import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { apiOrder } from '../constant/api';
import { IOder, IOrderResponse } from '../types/order';


@Injectable({ providedIn: 'root' })
export class OrderService {
    constructor(private http: HttpClient) { }

    orderDetailId = new BehaviorSubject<number>(0);

    setOrderDetailId(value: number): void {
        this.orderDetailId.next(value);
    }

    getOrderDetail(): BehaviorSubject<number> {
        return this.orderDetailId;
    }

    addOrder(idCart: number, orderRequest: IOder): Observable<IOrderResponse> {
        return this.http.post<IOrderResponse>(`${apiOrder.addOrder}${idCart}`, orderRequest)
    }
}