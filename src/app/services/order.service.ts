import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOrder, IOrderAndOrderDetail, IOrderResponse, IResponseOrder, IResponseOrderAndOrderDetails } from '../types/order';
import { HttpClient } from '@angular/common/http';
import { apiOrder, apiOrderDetail } from '../constant/api';

@Injectable({ providedIn: 'root' })
export class OrderService {
    constructor(private http: HttpClient) { }

    idOrderDetail = new BehaviorSubject<number>(1);

    setOrderDetail(value: number): void {
        this.idOrderDetail.next(value);
    }

    getOrderDetails(){
        return this.idOrderDetail
    }

    getOrder(idUser: number, textSearch: string): Observable<IResponseOrder> {
        return this.http.get<IResponseOrder>(`${apiOrder.getOrder}${idUser}?textSearch=${textSearch}`)
      }

    getOrderDetail(idOrder: number): Observable<IResponseOrderAndOrderDetails> {
        return this.http.get<IResponseOrderAndOrderDetails>(`${apiOrderDetail.getOrderDetail}${idOrder}`)
    }

    addOrder(idCart: number, orderRequest: IOrder): Observable<IOrderResponse> {
        return this.http.post<IOrderResponse>(`${apiOrder.addOrder}${idCart}`, orderRequest)
    }
}