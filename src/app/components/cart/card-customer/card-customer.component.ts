import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-card-customer',
  templateUrl: './card-customer.component.html',
  styleUrl: './card-customer.component.css',
})
export class CardCustomerComponent {
  @Input() listCard: any;
}
