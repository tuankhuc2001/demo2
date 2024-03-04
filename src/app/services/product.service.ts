import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: HttpClient) { }
  public upload(payload: FormData): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8080/upload
    `,
      payload
    );
  }
}
