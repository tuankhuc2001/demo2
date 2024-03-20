import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseOrderAndOrderDetails } from '../types/order';
import { apiOrderDetail } from '../constant/api';

@Injectable({providedIn: 'root'})
export class OrderDetailService {
    constructor(private http: HttpClient) { }

    getOrderDetail(idOrder: number): Observable<IResponseOrderAndOrderDetails> {
        return this.http.get<IResponseOrderAndOrderDetails>(`${apiOrderDetail.getOrderDetail}${idOrder}`)
    }
}