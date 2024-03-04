import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Url, objectApi } from '../constant/api';

@Injectable({ providedIn: 'root' })

export class ProductService {
  constructor(private http: HttpClient) { }

  getProductSale(textSearch: string, idUser: number): Observable<any> {
    return this.http.get<any>(`${objectApi.product}get${idUser}?textSearch=${textSearch}`)
  }

  getProductWarehouse(textSearch: string, idUser: number): Observable<any> {
    return this.http.get<any>(`${objectApi.product}get${idUser}?textSearch=${textSearch}`)
  }

}