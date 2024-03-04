import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IResponseProduct } from '../types/product';
import { apiProduct } from '../constant/api';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) { }

  upload(payload: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/upload`,payload)}
  
  getProductSale(idUser: number, textSearch: string): Observable<IResponseProduct> {
    return this.http.get<IResponseProduct>(`${apiProduct.getProductSale}${idUser}?textSearch=${textSearch}`)
  }
}

