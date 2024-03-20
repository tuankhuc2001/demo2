import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOrder, IOrderResponse, IResponseOrder } from '../types/order';
import { HttpClient } from '@angular/common/http';
import { apiOrder } from '../constant/api';

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

    addOrder(idCart: number, orderRequest: IOrder): Observable<IOrderResponse> {
        return this.http.post<IOrderResponse>(`${apiOrder.addOrder}${idCart}`, orderRequest)
    }
}