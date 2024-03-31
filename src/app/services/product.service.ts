import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct, IRequestProduct, IResponseProduct } from '../types/product';
import { apiProduct } from '../constant/api';
import { UserService } from './user.service';


@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient, private userService: UserService) { }

  upload(payload: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/upload`, payload)
  }

  getProductSale(idUser: number, textSearch: string): Observable<IResponseProduct> {
    const headers = this.userService.header()
    return this.http.get<IResponseProduct>(`${apiProduct.getProductSale}${idUser}?textSearch=${textSearch}`, {headers: headers});
  }

  addProduct(product: IRequestProduct): Observable<IResponseProduct> {
    const headers = this.userService.header()
    return this.http.post<IResponseProduct>(`${apiProduct.addProduct}`, product, {headers})
  }

  getProductWareHouse(idUser: number, textSearch: string): Observable<IResponseProduct> {
    return this.http.get<IResponseProduct>(`${apiProduct.getProductWarehouse}${idUser}?textSearch=${textSearch}`)
  }
  
  updateQuantity(id: number, payload: any): Observable<IResponseProduct> {
    return this.http.put<IResponseProduct>(`${apiProduct.updateProductQuantity}${id}`, payload)
  }

  updateProductWareHouse (productItem:IProduct, floorPrice: number| undefined) : Observable<IResponseProduct> {
    const product: IProduct = {...productItem};
    if(floorPrice)
    product.floorPrice = floorPrice;
    return this.http.put<IResponseProduct>(`${apiProduct.updatePrice}${productItem.id}`,product)
  }
}

