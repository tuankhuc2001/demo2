import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseOrderAndOrderDetails } from '../types/order';
import { apiOrderDetail } from '../constant/api';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class OrderDetailService {
    constructor(private http: HttpClient, private userService: UserService) { }

    getOrderDetail(idOrder: number): Observable<IResponseOrderAndOrderDetails> {
        const headers = this.userService.header()
        return this.http.get<IResponseOrderAndOrderDetails>(`${apiOrderDetail.getOrderDetail}${idOrder}`, {headers})
    }
}