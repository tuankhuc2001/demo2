import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { apiCustomer } from "../constant/api";
import { ICustomer, ICustomerRequest, IResponseCustomer } from "../types/customer";

@Injectable({ providedIn: 'root' })
export class CustomerService {

    searchInputSubject = new BehaviorSubject<string>('');

    constructor(private http: HttpClient) { }

    getSearchInput(): BehaviorSubject<string> {
        return this.searchInputSubject;
    }

    getCustomer(textSearch: string): Observable<IResponseCustomer> {
        return this.http.get<IResponseCustomer>(`${apiCustomer.getCustomer}?textSearch=${textSearch}`)
    }

    addCustomer(customerRequest: ICustomerRequest): Observable<IResponseCustomer> {
        return this.http.post<IResponseCustomer>(`${apiCustomer.addCustomer}`, customerRequest)
    }
}