import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct, IResponseProduct } from '../types/product';
import { apiProduct } from '../constant/api';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) { }

  upload(payload: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/upload`,payload)}
  
  getProductSale(idUser: number, textSearch: string): Observable<IResponseProduct> {
    return this.http.get<IResponseProduct>(`${apiProduct.getProductSale}${idUser}?textSearch=${textSearch}`)
  }

  getProductWareHouse(idUser: number, textSearch: string): Observable<IResponseProduct> {
    return this.http.get<IResponseProduct>(`${apiProduct.getProductWarehouse}${idUser}?textSearch =${textSearch} `)
  }

  updateProductWareHouse (productItem: IProduct) : Observable<IResponseProduct> {
    return this.http.put<IResponseProduct>(`${apiProduct.updatePrice}${productItem.id}`, productItem)
  }
}

