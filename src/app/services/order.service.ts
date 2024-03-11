import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IResponseOrder, IResponseOrderAndOrderDetails } from '../types/order';
import { HttpClient } from '@angular/common/http';
import { apiOrder, apiOrderDetail } from '../constant/api';

@Injectable({ providedIn: 'root' })
export class OrderService {
    constructor(private http: HttpClient) { }

    idOrderDetail = new BehaviorSubject<number>(0);

    setOrderDetailId(value: number): void {
        this.idOrderDetail.next(value);
    }

    getOrder(idUser: number, textSearch: string): Observable<IResponseOrder> {
        return this.http.get<IResponseOrder>(`${apiOrder.getOrder}${idUser}?textSearch=${textSearch}`)
      }

    getOrderDetail(idOrder: number): Observable<IResponseOrderAndOrderDetails> {
        return this.http.get<IResponseOrderAndOrderDetails>(`${apiOrderDetail.getOrderDetail}${idOrder}`)
    }
}