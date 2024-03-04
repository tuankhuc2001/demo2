import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
    constructor() { }

    orderDetailId = new BehaviorSubject<number>(0);

    setOrderDetailId(value: number): void {
        this.orderDetailId.next(value);
    }

    setOrderDetail(): BehaviorSubject<number> {
        return this.orderDetailId;
    }
}