import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { apiCustomer } from "../constant/api";
import { ICustomerRequest, IResponseCustomer } from "../types/customer";
import { UserService } from "./user.service";

@Injectable({ providedIn: 'root' })
export class CustomerService {

    searchInputSubject = new BehaviorSubject<string>('');

    constructor(private http: HttpClient, private userService: UserService) { }

    getSearchInput(): BehaviorSubject<string> {
        return this.searchInputSubject;
    }

    getCustomer(textSearch: string): Observable<IResponseCustomer> {
    const headers = this.userService.header()
    return this.http.get<IResponseCustomer>(`${apiCustomer.getCustomer}?textSearch=${textSearch}`,{headers})
    }

    addCustomer(customerRequest: ICustomerRequest): Observable<IResponseCustomer> {
    const headers = this.userService.header()
    return this.http.post<IResponseCustomer>(`${apiCustomer.addCustomer}`, customerRequest, {headers})}
}