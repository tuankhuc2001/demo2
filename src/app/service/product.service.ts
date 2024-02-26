import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { IProduct } from '../types/product';

@Injectable({providedIn: 'root'})

export class ProductService {

  private response = new ReplaySubject<IProduct>()
  private responseField: IProduct | undefined


  getProductWareHouse(): Observable<IProduct> {
    return this.response.asObservable()
  }
}