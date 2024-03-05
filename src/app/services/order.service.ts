import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IResponseOrder } from '../types/order';
import { HttpClient } from '@angular/common/http';
import { apiOrder } from '../constant/api';

@Injectable({ providedIn: 'root' })
export class OrderService {
    constructor(private http: HttpClient) { }

    orderDetailId = new BehaviorSubject<number>(0);

    setOrderDetailId(value: number): void {
        this.orderDetailId.next(value);
    }

    getOrder(idUser: number, textSearch: string): Observable<IResponseOrder> {
        return this.http.get<IResponseOrder>(`${apiOrder.getOrder}${idUser}?textSearch=${textSearch}`)
      }

    getOrderDetail(): BehaviorSubject<number> {
        return this.orderDetailId;
    }
}