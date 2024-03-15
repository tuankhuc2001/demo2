import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponseProduct } from '../types/product';
import { apiProduct } from '../constant/api';


@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) { }
  
  getProductSale(idUser: number, textSearch: string): Observable<IResponseProduct> {
    return this.http.get<IResponseProduct>(`${apiProduct.getProductSale}${idUser}?textSearch=${textSearch}`)
  }
  
  getProductWareHouse(idUser: number, textSearch: string): Observable<IResponseProduct> {
    return this.http.get<IResponseProduct>(`${apiProduct.getProductWarehouse}${idUser}?textSearch=${textSearch}`)
  }
  updateQuantity(id: number, payload: any): Observable<IResponseProduct> {
    return this.http.put<IResponseProduct>(`${apiProduct.updateProductQuantity}${id}`, payload)
  }
}
