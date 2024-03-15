import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct, IRequestProduct, IResponseProduct } from '../types/product';
import { apiProduct } from '../constant/api';
import { NzUploadFile } from 'ng-zorro-antd/upload';


@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) { }

  upload(payload: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/upload`, payload)
  }

  getProductSale(idUser: number, textSearch: string): Observable<IResponseProduct> {
    return this.http.get<IResponseProduct>(`${apiProduct.getProductSale}${idUser}?textSearch=${textSearch}`)
  }

  addProduct(product: IRequestProduct): Observable<IResponseProduct> {
    return this.http.post<IResponseProduct>(`${apiProduct.addProduct}`, product)
  }
  getProductWareHouse(idUser: number, textSearch: string): Observable<IResponseProduct> {
    return this.http.get<IResponseProduct>(`${apiProduct.getProductWarehouse}${idUser}?textSearch=${textSearch}`)
  }
  updateQuantity(id: number, payload: any): Observable<IResponseProduct> {
    return this.http.put<IResponseProduct>(`${apiProduct.updateProductQuantity}${id}`, payload)
  }
}
