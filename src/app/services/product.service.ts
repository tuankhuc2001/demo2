import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, filter } from 'rxjs';
import { IProduct, IRequestProduct, IResponseProduct } from '../types/product';
import { apiProduct } from '../constant/api';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient, private userService: UserService) { }

  headerUpload(): HttpHeaders {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return headers;
  }

  uploadImage(formData: FormData, header: HttpHeaders): Observable<any> {
    const req = new HttpRequest('POST','http://localhost:8080/upload',formData,{  headers: header });
    return this.http
      .request(req)
      .pipe(filter((e) => e instanceof HttpResponse));
  }

  getProductSale(
    idUser: number,
    textSearch: string
  ): Observable<IResponseProduct> {
    const headers = this.userService.header();
    return this.http.get<IResponseProduct>(
      `${apiProduct.getProductSale}${idUser}?textSearch=${textSearch}`,
      { headers: headers }
    );
  }

  addProduct(product: IRequestProduct): Observable<IResponseProduct> {
    const headers = this.userService.header();
    return this.http.post<IResponseProduct>(
      `${apiProduct.addProduct}`,
      product,
      { headers }
    );
  }

  getProductWareHouse(
    idUser: number,
    textSearch: string
  ): Observable<IResponseProduct> {
    const headers = this.userService.header();
    return this.http.get<IResponseProduct>(
      `${apiProduct.getProductWarehouse}${idUser}?textSearch=${textSearch}`,
      { headers }
    );
  }

  getProduct(): Observable<IResponseProduct> {
    const headers = this.userService.header();
    return this.http.get<IResponseProduct>(`${apiProduct.getProductWarehouse}}`, { headers });
  }

  updateQuantity(id: number, payload: any): Observable<IResponseProduct> {
    const headers = this.userService.header();
    return this.http.put<IResponseProduct>(
      `${apiProduct.updateProductQuantity}${id}`,
      payload,
      { headers }
    );
  }

  updateProductWareHouse(
    productItem: IProduct,
    floorPrice: number | undefined
  ): Observable<IResponseProduct> {
    const headers = this.userService.header();
    const product: IProduct = { ...productItem };
    if (floorPrice) product.floorPrice = floorPrice;
    return this.http.put<IResponseProduct>(
      `${apiProduct.updatePrice}${productItem.id}`,
      product,
      { headers }
    );
  }
}
