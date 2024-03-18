import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICustomerRequest, IResponseCustomer } from '../types/customer';
import { apiCustomer } from '../constant/api';

@Injectable({ providedIn: 'root' })
export class CustomerService {

    constructor(private http: HttpClient) { }

    getCustomer(textSearch: string): Observable<IResponseCustomer> {
        return this.http.get<IResponseCustomer>(`http://localhost:8080/customer/getCustomer?textSearch=${textSearch}`)
    }

    addCustomer(customer: ICustomerRequest): Observable<IResponseCustomer> {
        console.log(customer);
        
        return this.http.post<IResponseCustomer>(`http://localhost:8080/customer/addCustomer`, customer)
    }

}